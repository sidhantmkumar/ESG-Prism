import os
import json
import tempfile
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from google.genai import types

from scraper import scrape_web, scrape_url
from pdf_parser import extract_pdf
from rag import retrieve_top_context
from prompts import SYSTEM_PROMPT, build_user_prompt

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI()

# CORS — allows frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this after deployment
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client
client = genai.Client()


@app.get("/")
def root():
    return {"status": "ESG Prism backend running"}


@app.post("/analyze")
async def analyze(
    company: str = Form(...),
    url: str = Form(None),
    pdf: UploadFile = File(None)
):
    try:
        all_texts = []
        all_sources = []

        print(f"\nAnalyzing: {company}")
        print("Step 1: Web search...")
        web_result = scrape_web(company)
        all_texts.extend(web_result["texts"])
        all_sources.extend(web_result["urls"])
        print(f"Web search complete. Sources found: {len(web_result['urls'])}")

        if url and url.strip():
            print("Step 2: Scraping URL...")
            url_text = scrape_url(url.strip())
            all_texts.append(url_text)
            all_sources.append(url.strip())

        if pdf and pdf.filename:
            print("Step 3: Extracting PDF...")
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                content = await pdf.read()
                tmp.write(content)
                tmp_path = tmp.name
            pdf_text = extract_pdf(tmp_path)
            all_texts.append(pdf_text)
            os.unlink(tmp_path)

        print("Step 4: Running RAG pipeline...")
        top_chunks = retrieve_top_context(all_texts, company)
        print(f"RAG complete. {len(top_chunks)} chunks retrieved.")

        print("Step 5: Calling Gemini for analysis...")
        user_prompt = build_user_prompt(company, top_chunks, all_sources)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.2,
            )
        )

        raw_output = response.text.strip()

        if raw_output.startswith("```"):
            raw_output = raw_output.split("```")[1]
            if raw_output.startswith("json"):
                raw_output = raw_output[4:]

        result = json.loads(raw_output)
        print("Done.")
        return result

    except Exception as e:
        import traceback
        error_detail = traceback.format_exc()
        print(f"ERROR: {error_detail}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e), "detail": error_detail}
        )
@app.get("/models")
def list_models():
    models = client.models.list()
    return [m.name for m in models]