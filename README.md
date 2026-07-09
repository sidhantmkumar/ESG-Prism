# 🌿 ESG Prism

> AI-powered ESG due diligence platform. Enter any company name and get a full Environmental, Social, and Governance analysis with scores, risks, and a clear verdict — in under 30 seconds.

## 🔗 Live Links

- **Frontend:** https://esg-prism-tqqn.vercel.app
- **Backend API:** https://esg-prism-backend.onrender.com
- **API Docs:** https://esg-prism-backend.onrender.com/docs
- **GitHub:** https://github.com/dishi575/ESG-Prism

---
## 🎥 Product Walkthrough

A complete walkthrough demonstrating the ESG analysis workflow, Retrieval-Augmented Generation (RAG), evidence retrieval, AI-based ESG scoring, and PDF report generation.

<p align="center">
  <a href="https://youtu.be/YOUR_VIDEO_LINK">
    <img
      src="assets/demo-thumbnail-esg.png"
      alt="Watch ESG Prism Demo"
      width="550">
  </a>
</p>

<p align="center">
  <sub><b>Click the thumbnail above to watch the full project walkthrough.</b></sub>
</p>

# What It Does

Enter any company name (+ optional website URL or ESG PDF report) and get:

- **E / S / G scores** (0-100) with evidence-backed reasoning
- **Risk classification** — Low / Medium / High / Critical
- **Top 3 risks** identified from live sources
- **Recommendations** grouped by E / S / G dimension
- **Suggested next steps** as concrete actions
- **Clear verdict** — APPROVED / CONDITIONAL / CAUTION / REJECTED
- **Downloadable PDF report**

---

# How It Works — AI Architecture

This is not a wrapper around ChatGPT. It uses a custom 5-layer pipeline.

## Layer 1 — Live Multi-Source Retrieval

- Live web search via Gemini 2.5 Flash with Google Search grounding
- Optional company website scraping via BeautifulSoup
- Optional ESG PDF report extraction via pypdf

## Layer 2 — Custom RAG Pipeline

- All text chunked into 300-word overlapping segments (50-word overlap)
- Every chunk embedded via Gemini Embedding API (gemini-embedding-002)
- 5 ESG-specific domain queries run against embeddings using cosine similarity
- Top 12 highest-relevance chunks selected for analysis

## Layer 3 — Enforced Scoring Rubric

- E/S/G scores based only on evidence in retrieved context
- Fixed rules: strong evidence = 75-100, mixed = 50-74, weak = 25-49, violations = 0-24
- Overall score = weighted average (E:30%, S:35%, G:35%)
- Temperature set to 0.2 for consistent output

## Layer 4 — Fixed Risk & Verdict Framework

- Risk level determined by hard score thresholds (not LLM opinion)
- Verdict follows deterministically from risk level
- Same company analyzed twice produces same verdict

## Layer 5 — Full Decision-Support in One Pass

- Scores + risks + recommendations + next steps + verdict in one API call
- Every reason cites specific evidence from retrieved context

---

# Tech Stack

| Layer | Technology |
|---------|---------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | FastAPI (Python) |
| Web Search | Gemini 2.5 Flash + Google Search grounding |
| Embeddings | Gemini Embedding API (gemini-embedding-002) |
| RAG Logic | Custom Python — chunking, cosine similarity, top-K retrieval |
| PDF Parsing | pypdf |
| Web Scraping | requests + BeautifulSoup4 |
| PDF Export | jsPDF + html2canvas-pro |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

# Project Structure

```text
ESG-Prism/
├── render.yaml                 ← Render deployment config
├── README.md
│
├── backend/
│   ├── main.py                 ← FastAPI app, /analyze endpoint
│   ├── scraper.py              ← Web search + URL scraping
│   ├── pdf_parser.py           ← PDF text extraction
│   ├── rag.py                  ← Chunking, embedding, retrieval
│   ├── prompts.py              ← System prompt + user prompt builder
│   ├── requirements.txt        ← Python dependencies
│   └── .env.example            ← Environment variable template
│
├── frontend/
│   └── src/app/
│       ├── page.tsx            ← Input page
│       ├── loading/page.tsx    ← Loading screen + API call
│       └── results/page.tsx    ← Results display + PDF export
│
└── docs/
    ├── data-flow.md            ← Step-by-step data flow
    ├── value-beyond-llm.md     ← Why not just ChatGPT
    ├── architecture.md         ← Full architecture + API docs
    └── demo-scenarios.md       ← Example runs + limitations
```

---

# Local Setup

## Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

## Backend (`backend/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=https://esg-prism-backend.onrender.com
```

---

# API Reference

## POST `/analyze`

### Request: `multipart/form-data`

- `company` (string, required)
- `url` (string, optional)
- `pdf` (file, optional)

### Response

```json
{
  "company": "string",
  "overall_score": 73,
  "environmental": {
    "score": 72,
    "reasons": ["..."]
  },
  "social": {
    "score": 83,
    "reasons": ["..."]
  },
  "governance": {
    "score": 63,
    "reasons": ["..."]
  },
  "risk_level": "Medium",
  "top_risks": ["risk1", "risk2", "risk3"],
  "recommendations": {
    "environmental": ["..."],
    "social": ["..."],
    "governance": ["..."]
  },
  "next_steps": ["step1", "step2", "step3"],
  "verdict": "CONDITIONAL",
  "verdict_reason": "string",
  "sources_used": ["url1", "url2"]
}
```

---

# Team

- **Dishita** 
- **Sidhant** 

# License

MIT
