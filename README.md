<p align="center">

# ESG Prism

### Enterprise AI Platform for Automated ESG Due Diligence

Analyze publicly known companies using **live web intelligence, Retrieval-Augmented Generation (RAG), semantic search, and large language models** to generate explainable Environmental, Social, and Governance (ESG) assessments in under 30 seconds.

[🎥 Watch Demo](https://youtu.be/YOUR_VIDEO)

•
[🌐 Live Demo](https://esg-prism-tqqn.vercel.app)

•
[📚 Documentation](docs/architecture.md)

•
[⚙ API](https://esg-prism-backend.onrender.com/docs)

</p>

---

<p align="center">

<img src="assets/banner.png" width="100%">

</p>

---

## 🎥 Product Walkthrough

A complete walkthrough demonstrating the ESG analysis workflow, Retrieval-Augmented Generation (RAG), evidence retrieval, AI-assisted scoring, and PDF report generation.

<p align="center">
<a href="https://youtu.be/a0k-ZxLk-1Y?si=ZzhGWXzT5RCQxEaE">
<img src="assets/demo-thumbnail.png"
width="550"
alt="Watch ESG Prism Demo">
</a>
</p>

<p align="center">
<sub><b>Click the thumbnail above to watch the complete project walkthrough.</b></sub>
</p>

---

## Screenshots

### Landing Page

The application accepts a company name, website, and ESG report to initiate an automated due diligence analysis.

<p align="center">
<img src="assets/landing-page.png" width="900">
</p>

---

### Analysis Pipeline

During execution, the backend performs live evidence retrieval, semantic ranking, RAG context construction, and structured LLM inference.

<p align="center">
<img src="assets/loading.png" width="900">
</p>

---

### ESG Assessment

The generated report includes ESG scores, supporting evidence, risk categorization, citations, and AI-generated explanations.

<p align="center">
<img src="assets/results.png" width="900">
</p>

---

### Exportable Report

Completed analyses can be exported as professionally formatted PDF reports for auditing and compliance purposes.

<p align="center">
<img src="assets/pdf-report.png" width="900">
</p>

---

# Table of Contents

- Overview
- Problem Statement
- Solution
- Core Capabilities
- System Architecture
- AI Pipeline
- Technology Stack
- Repository Structure
- Installation
- Environment Variables
- Roadmap
- Documentation
- Authors
- License

---

# Overview

ESG Prism is a full-stack AI platform that automates Environmental, Social, and Governance (ESG) due diligence by combining live web intelligence with Retrieval-Augmented Generation.

Instead of relying solely on static sustainability reports or manual research, the platform aggregates information from multiple public sources, retrieves the most relevant evidence through semantic search, and generates structured ESG assessments using Google's Gemini models.

The system is intended to support analysts, procurement teams, investors, and organizations that require rapid, explainable ESG evaluations before engaging with external companies.

---

# Problem Statement

Traditional ESG due diligence is a manual and time-intensive process that requires analysts to review sustainability reports, annual filings, regulatory disclosures, and news articles across multiple sources.

This process often results in inconsistent evaluations, limited transparency, and significant effort when assessing multiple organizations.

For small teams and procurement workflows, conducting comprehensive ESG reviews can become operationally expensive and difficult to scale.

---

# Solution

ESG Prism automates the complete due diligence workflow.

For every analysis request, the platform gathers publicly available information, retrieves the most relevant evidence using semantic search, enriches the prompt through Retrieval-Augmented Generation, and generates structured ESG assessments with supporting justifications.

Rather than producing generic AI responses, the platform grounds every evaluation in retrieved context, improving both transparency and factual consistency.
