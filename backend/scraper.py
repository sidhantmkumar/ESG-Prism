import os
import requests
import time
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# 1. CHANGED: Use the new correct SDK imports
from google import genai
from google.genai import types

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

# 2. CHANGED: Initialize the new GenAI Client
# It automatically reads your GEMINI_API_KEY environment variable
client = genai.Client()

def scrape_web(company_name: str) -> dict:
    """
    Uses Gemini 2.5 Flash with Google Search grounding
    to find live ESG information about the company.
    """
    try:
        # Pause for 2 seconds before the call to respect the free tier rate limit
        time.sleep(2) 
        
        google_search_tool = types.Tool(
            google_search=types.GoogleSearch()
        )
        
        config = types.GenerateContentConfig(
            tools=[google_search_tool]
        )

        # 2. CHANGED: Swapped model to gemini-2.5-flash to unlock the free tier
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"""Search and find detailed ESG (Environmental, Social, Governance) 
            information about {company_name}. Include:
            - Environmental impact, carbon emissions, climate commitments
            - Labor practices, diversity, human rights, social responsibility
            - Board governance, ethics, compliance, controversies
            - Any ESG ratings, sustainability reports, or scores
            - Any recent ESG-related news or controversies
            
            Return everything as detailed plain text, minimum 800 words.""",
            config=config
        )

        text = response.text if response.text else ""

        # 5. CHANGED: Safely extract search result sources using the new SDK structure
        sources = []
        try:
            # Check if candidates and grounding metadata exist
            if response.candidates and response.candidates[0].grounding_metadata:
                grounding = response.candidates[0].grounding_metadata
                # Look for sources inside grounding_chunks
                if grounding.grounding_chunks:
                    for chunk in grounding.grounding_chunks:
                        if chunk.web and chunk.web.uri:
                            sources.append(chunk.web.uri)
                            
                    # Remove duplicate URLs if the model lists a website twice
                    sources = list(set(sources))
        except Exception:
            pass  # sources are optional, don't crash if unavailable

        return {
            "texts": [text],
            "urls": sources
        }

    except Exception as e:
        return {
            "texts": [f"Web search failed: {str(e)}"],
            "urls": []
        }


def scrape_url(url: str) -> str:
    """
    Scrapes a given URL and returns clean body text.
    Used when user provides optional company website.
    """
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, "html.parser")

        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()

        text = soup.get_text(separator=" ", strip=True)
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        clean_text = " ".join(lines)

        return clean_text[:8000]

    except Exception as e:
        return f"Could not scrape URL: {str(e)}"


# Test
if __name__ == "__main__":
    result = scrape_web("Tata Motors")
    print("SOURCES FOUND:", result["urls"])
    print("\nTEXT PREVIEW:")
    print(result["texts"][0][:1000])