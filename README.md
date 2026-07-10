<p align="center">
  <img src="assets/banner.png" alt="ESG Prism Banner" width="100%">
</p>

<h1 align="center">ESG Prism</h1>

<p align="center">
  <strong>Enterprise AI Platform for Automated ESG Due Diligence</strong>
</p>

<p align="center">
Analyze publicly known companies using <strong>live web intelligence</strong>,
<strong>Retrieval-Augmented Generation (RAG)</strong>,
<strong>semantic search</strong>, and
<strong>Google Gemini</strong> to generate explainable ESG risk assessments in under 30 seconds.
</p>

<p align="center">

<img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
<img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi" />
<img src="https://img.shields.io/badge/Google-Gemini-blue" />
<img src="https://img.shields.io/badge/Python-3776AB?logo=python" />
<img src="https://img.shields.io/badge/RAG-Retrieval--Augmented-success" />
<img src="https://img.shields.io/badge/License-MIT-green" />

</p>

<p align="center">

<a href="https://esg-prism-tqqn.vercel.app">
<img src="https://img.shields.io/badge/Live_Demo-Open_Application-14b8a6?style=for-the-badge">
</a>

<a href="https://youtu.be/YOUR_VIDEO_LINK">
<img src="https://img.shields.io/badge/Watch_Demo-YouTube-red?style=for-the-badge">
</a>

<a href="https://esg-prism-backend.onrender.com/docs">
<img src="https://img.shields.io/badge/API-Swagger-blue?style=for-the-badge">
</a>

<a href="docs/architecture.md">
<img src="https://img.shields.io/badge/Technical_Docs-Read-black?style=for-the-badge">
</a>

</p>

---

# Product Walkthrough

A complete walkthrough covering the end-to-end ESG due diligence workflow, including live evidence retrieval, Retrieval-Augmented Generation (RAG), AI-powered ESG scoring, structured report generation, and PDF export.

<p align="center">
<a href="https://youtu.be/a0k-ZxLk-1Y?si=ZzhGWXzT5RCQxEaE">
<img src="assets/demo-thumbnail-esg.png"
width="560"
alt="Watch ESG Prism Demo">
</a>
</p>

<p align="center">
<b>Click the thumbnail above to watch the complete project walkthrough.</b>
</p>

---

# Application Preview

<table>
<tr>
<td width="50%">

### Landing Experience

The application accepts a company name, company website, and optional ESG report to initiate an AI-powered due diligence analysis.

<img src="assets/landing-page.png">

</td>

<td width="50%">

### Processing Pipeline

The backend retrieves live evidence, ranks relevant context, constructs RAG prompts, and generates structured ESG insights.

<img src="assets/loading.png">

</td>
</tr>

<tr>
<td>

### ESG Assessment

Structured ESG scores are generated with supporting evidence, confidence indicators, risk categorization, and explainable reasoning.

<img src="assets/results.png">

</td>

<td>

### Exportable Reports

Every completed assessment can be exported as a professionally formatted PDF for compliance, auditing, and stakeholder review.

<img src="assets/pdf-report.png">

</td>
</tr>
</table>

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Core Capabilities](#core-capabilities)
- [System Architecture](#system-architecture)
- [AI Analysis Pipeline](#ai-analysis-pipeline)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [Documentation](#documentation)
- [Author](#author)
- [License](#license)

---

# Overview

ESG Prism is a full-stack AI platform that automates Environmental, Social, and Governance (ESG) due diligence using Retrieval-Augmented Generation (RAG), semantic search, and large language models.

Instead of relying solely on manual research or static sustainability reports, the platform gathers publicly available information, retrieves the most relevant evidence through semantic similarity, and generates structured ESG assessments grounded in verifiable context.

Designed for procurement teams, analysts, investors, and compliance professionals, ESG Prism delivers explainable ESG evaluations in seconds while maintaining transparency through evidence-backed reasoning.

---

# Problem Statement

Conducting ESG due diligence requires reviewing sustainability reports, annual filings, regulatory disclosures, and news coverage across numerous sources.

This manual process is often time-consuming, inconsistent, and difficult to scale when evaluating multiple organizations.

Additionally, conventional AI systems frequently generate generic summaries without grounding their responses in factual evidence, limiting trust and explainability.

---

# Solution

ESG Prism automates the complete due diligence workflow by combining live web intelligence with Retrieval-Augmented Generation.

For every analysis request, the platform retrieves relevant public information, ranks evidence using semantic similarity, enriches prompts with contextual knowledge, and generates structured ESG assessments using Google's Gemini models.

Every report is supported by retrieved evidence, enabling transparent, explainable, and repeatable ESG evaluations suitable for procurement, investment, and compliance workflows.

# Core Capabilities

<table>
<tr>
<td width="50%">

### Live Web Intelligence

Retrieves current information about target organizations from publicly available sources to ensure assessments are based on recent and relevant evidence rather than static reports.

</td>

<td width="50%">

### Retrieval-Augmented Generation

Constructs evidence-grounded prompts by combining semantic retrieval with Google's Gemini models, improving factual consistency and explainability.

</td>
</tr>

<tr>
<td>

### Structured ESG Assessment

Generates standardized Environmental, Social, and Governance evaluations with individual scores, overall risk ratings, and supporting justifications.

</td>

<td>

### Semantic Evidence Retrieval

Ranks retrieved content using embedding-based similarity to identify the most relevant information before inference.

</td>
</tr>

<tr>
<td>

### Explainable AI

Every assessment is accompanied by supporting evidence, source references, and reasoning to improve transparency and auditability.

</td>

<td>

### Professional Report Generation

Produces structured PDF reports suitable for procurement, investment analysis, compliance reviews, and stakeholder communication.

</td>
</tr>
</table>

---

# System Architecture

The platform follows a modular architecture where the frontend, backend, retrieval pipeline, and AI services operate as independent components.

```mermaid
graph TD

A["User"]

--> B["Next.js Frontend"]

B --> C["FastAPI Backend"]

C --> D["Search & Data Retrieval"]

D --> E["RAG Pipeline"]

E --> F["Google Gemini"]

F --> G["Structured ESG Report"]

G --> H["Frontend Dashboard"]

G --> I["PDF Report"]
```

---

# AI Analysis Pipeline

Each analysis request passes through multiple stages before a final ESG assessment is generated.

```mermaid
flowchart TD

A["Company Information"]

--> B["Input Validation"]

B --> C["Live Evidence Retrieval"]

C --> D["Document Processing"]

D --> E["Embedding Generation"]

E --> F["Semantic Retrieval"]

F --> G["Context Construction"]

G --> H["Gemini Inference"]

H --> I["Structured ESG Assessment"]

I --> J["Interactive Dashboard"]

I --> K["PDF Export"]
```

---

# Technology Stack

| Layer | Technologies |
|--------|--------------|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python |
| AI | Google Gemini, Retrieval-Augmented Generation (RAG), Semantic Embeddings |
| Search | Live Web Search, Context Retrieval |
| Report Generation | PDF Generation |
| Deployment | Vercel, Render |
| Documentation | Swagger / OpenAPI |

---

# Repository Structure

```text
ESG-Prism/

├── backend/
│   ├── api/
│   ├── services/
│   ├── rag/
│   ├── prompts/
│   ├── models/
│   ├── utils/
│   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── public/
│
├── assets/
│
├── docs/
│   ├── architecture.md
│   ├── rag.md
│   ├── api.md
│   ├── engineering-decisions.md
│   ├── deployment.md
│   ├── security.md
│   ├── performance.md
│   └── testing.md
│
├── README.md
└── LICENSE
```

---

# Design Principles

The architecture is built around a small set of engineering principles:

- **Modularity** — Independent frontend, backend, and AI components simplify maintenance and future expansion.
- **Explainability** — ESG assessments are grounded in retrieved evidence rather than generated solely from model knowledge.
- **Separation of Concerns** — User interface, business logic, retrieval, and inference remain isolated within dedicated modules.
- **Scalability** — Individual services can evolve or be replaced without affecting the overall workflow.
- **Extensibility** — Additional retrieval strategies, AI models, or ESG frameworks can be integrated with minimal architectural changes.

---

# Documentation

Additional technical documentation is available within the `docs/` directory.

| Document | Description |
|----------|-------------|
| `architecture.md` | Overall system architecture and request lifecycle |
| `rag.md` | Retrieval-Augmented Generation pipeline |
| `api.md` | REST API documentation |
| `engineering-decisions.md` | Key architectural and implementation decisions |
| `deployment.md` | Deployment architecture and infrastructure |
| `security.md` | Authentication, validation, and security practices |
| `performance.md` | Performance characteristics and optimization strategies |
| `testing.md` | Testing approach and future automation |

# Getting Started

## Prerequisites

Before running the project locally, ensure the following software is installed:

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| Python | 3.10+ |
| npm | Latest |
| Git | Latest |

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/dishi575/ESG-Prism.git

cd ESG-Prism
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create and activate a virtual environment.

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the backend server.

```bash
uvicorn main:app --reload
```

The backend will be available at

```
http://localhost:8000
```

Interactive API documentation

```
http://localhost:8000/docs
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend will be available at

```
http://localhost:3000
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Google Gemini API Key |
| `SEARCH_API_KEY` | Search service API key |
| `SEARCH_ENGINE_ID` | Search engine identifier (if applicable) |
| `ALLOWED_ORIGINS` | Allowed frontend origins |
| `SECRET_KEY` | Application secret (if used) |

Create a `.env.local` file inside the frontend directory.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL |

> **Note**
>
> Never commit environment files or API keys to version control.

---

# Running the Application

Start the backend.

```bash
uvicorn main:app --reload
```

Start the frontend.

```bash
npm run dev
```

Open

```
http://localhost:3000
```

Enter:

- Company Name
- Company Website
- ESG Report (Optional)

and initiate the analysis.

---

# Roadmap

## Completed

- Live company analysis
- Retrieval-Augmented Generation pipeline
- Semantic evidence retrieval
- AI-powered ESG scoring
- Explainable assessments
- Interactive dashboard
- PDF report generation
- REST API
- Responsive frontend

---

## In Progress

- Improved retrieval accuracy
- Enhanced evidence ranking
- Expanded ESG scoring methodology

---

## Planned

- Multi-company comparison
- Historical ESG trend analysis
- User authentication
- Saved analysis history
- Background processing
- Batch company analysis
- Dashboard analytics
- Advanced report customization

---

# Documentation

Detailed technical documentation is available in the `docs/` directory.

| Document | Purpose |
|----------|---------|
| `architecture.md` | System architecture and request lifecycle |
| `rag.md` | Retrieval-Augmented Generation pipeline |
| `api.md` | REST API reference |
| `engineering-decisions.md` | Design rationale and architectural choices |
| `deployment.md` | Deployment architecture |
| `security.md` | Security model |
| `performance.md` | Performance considerations |
| `testing.md` | Testing strategy |

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

Please ensure that new contributions follow the existing project structure and coding conventions.

---

# Author

**Sidhant Kumar**

Computer Science Engineering Student

GitHub

```
https://github.com/sidhantmkumar
```

LinkedIn

```
https://www.linkedin.com/in/sidhant-k-1315ba289/
```

---

# License

This project is licensed under the **MIT License**.

See the `LICENSE` file for additional information.

---

<p align="center">

Developed with a focus on practical AI engineering, explainable machine learning, and scalable software architecture.

</p>
