# 🌿 ESG Due Diligence AI
> AI-powered platform for instant ESG analysis of any company.
> Built for InnovateZ 2026 by ESG Prism.

## What It Does
Enter any company name (+ optional website URL or ESG PDF report)
and get a full due diligence report in under 15 seconds:
- E / S / G scores with evidence-backed reasoning
- Risk classification (Low / Medium / High / Critical)
- Top risks, recommendations, and next steps
- Clear verdict: APPROVED / CONDITIONAL / CAUTION / REJECTED

## How It Works (AI Architecture)
This is not a wrapper around ChatGPT. It uses a custom RAG pipeline:

1. **Multi-source retrieval** — web search, URL scraping, PDF parsing
2. **Chunking** — all text split into 300-word overlapping chunks
3. **Embedding** — chunks embedded using `all-MiniLM-L6-v2` locally
4. **Semantic retrieval** — 5 ESG-domain queries run against embeddings
5. **Top-K selection** — only highest-relevance chunks sent to Claude
6. **Structured output** — Claude returns strict JSON, not freeform text

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS, Framer Motion
- **Backend:** FastAPI (Python)
- **RAG Layer:** sentence-transformers (`all-MiniLM-L6-v2`)
- **LLM:** Claude API (claude-sonnet-4-6) with web search tool
- **Deployment:** Vercel (frontend) + Render (backend)

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Add your ANTHROPIC_API_KEY
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local   # Add your backend URL
npm run dev
```

## Team
- Sidhant Kumar — Frontend/Integration
- Dishita Chaturvedi — AI/Backend

## License
MIT
