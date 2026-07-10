# Engineering Decisions

## Overview

This document outlines the major architectural and implementation decisions made during the development of ESG Prism.

Each decision was driven by the project's goals of building an explainable, maintainable, and production-oriented AI platform capable of performing ESG due diligence using Retrieval-Augmented Generation (RAG).

The objective is not simply to describe the technology stack, but to explain the reasoning behind the architectural choices and the trade-offs considered during development.

---

# AI Architecture

## Decision

Adopt a Retrieval-Augmented Generation (RAG) architecture instead of relying solely on a Large Language Model.

## Context

Traditional LLMs generate responses using pre-trained knowledge, which may be outdated, unverifiable, or lack domain-specific context.

Since ESG analysis depends on recent company disclosures, sustainability reports, regulatory information, and public news, relying only on model knowledge would reduce factual reliability.

## Decision Rationale

Retrieval-Augmented Generation enables the system to:

- Retrieve relevant external information
- Ground model responses using retrieved evidence
- Improve explainability
- Reduce hallucinations
- Produce context-aware ESG assessments

## Trade-offs

### Advantages

- More reliable outputs
- Improved factual consistency
- Explainable recommendations
- Better adaptability to changing information

### Disadvantages

- Additional retrieval latency
- Increased pipeline complexity
- Dependence on external information quality

---

# Backend Framework

## Decision

FastAPI was selected as the backend framework.

## Context

The backend orchestrates the complete ESG analysis pipeline, including request validation, retrieval, prompt construction, AI inference, and report generation.

The framework required:

- High performance
- Native asynchronous support
- Automatic request validation
- Interactive API documentation

## Why FastAPI?

FastAPI provides:

- Asynchronous request handling
- Automatic OpenAPI generation
- Pydantic validation
- Type safety
- Lightweight architecture

## Alternatives Considered

- Flask
- Django

## Trade-offs

Advantages

- High throughput
- Modern Python ecosystem
- Minimal boilerplate

Disadvantages

- Smaller ecosystem than Django
- Requires understanding asynchronous programming

---

# Frontend Framework

## Decision

Next.js was selected for the frontend.

## Context

The frontend required:

- Modern component architecture
- Efficient routing
- Responsive rendering
- Strong TypeScript support

## Why Next.js?

Next.js provides:

- File-based routing
- Optimized production builds
- Excellent React ecosystem
- Improved developer experience

---

# AI Model

## Decision

Google Gemini was selected as the inference model.

## Context

The application requires structured reasoning, long-context processing, and consistent response formatting for ESG assessments.

## Why Gemini?

The selected model provides:

- Strong reasoning capability
- High-quality structured generation
- Support for large contextual prompts
- Reliable instruction following

## Alternatives Considered

- OpenAI GPT
- Claude
- Llama

## Trade-offs

Advantages

- Excellent structured output
- Strong reasoning performance
- Efficient inference

Disadvantages

- External API dependency
- Inference latency
- Usage costs

---

# Semantic Retrieval

## Decision

Use embedding-based semantic retrieval instead of keyword matching.

## Context

ESG terminology varies significantly across organizations.

A keyword search may fail to retrieve semantically similar information expressed using different wording.

## Decision Rationale

Embedding-based retrieval enables:

- Context-aware matching
- Better semantic understanding
- Improved evidence quality
- Higher retrieval relevance

---

# Prompt Engineering

## Decision

Generate structured prompts instead of free-form prompts.

## Context

The frontend expects a predictable response schema.

Unstructured prompts increase output variability and complicate rendering.

## Benefits

- Consistent outputs
- Easier validation
- Simplified frontend rendering
- Better maintainability

---

# Explainable AI

## Decision

Ground every ESG assessment using retrieved evidence.

## Context

Users should understand why the platform assigns a particular ESG score.

Rather than presenting unsupported conclusions, the system links assessments to retrieved contextual information.

## Benefits

- Transparency
- Increased trust
- Easier auditing
- Explainable recommendations

---

# PDF Generation

## Decision

Generate downloadable reports directly from structured analysis.

## Context

ESG due diligence frequently requires documentation for procurement, compliance, and stakeholder review.

Providing exportable reports improves usability beyond the web interface.

---

# Application Architecture

## Decision

Adopt a modular layered architecture.

```text
Frontend

↓

Backend

↓

Retrieval

↓

Inference

↓

Report Generation
```

## Benefits

- Clear separation of concerns
- Easier maintenance
- Independent component evolution
- Better testability

---

# Error Handling

## Decision

Return structured error responses throughout the pipeline.

## Motivation

Failures may occur during:

- Search
- Retrieval
- AI inference
- Report generation

Consistent error structures simplify debugging and improve user experience.

---

# Current Limitations

The current architecture assumes:

- Publicly accessible company information
- Moderate request volume
- Single-request processing
- External AI service availability

These assumptions simplify implementation while remaining appropriate for the current scale of the application.

---

# Future Improvements

Potential architectural enhancements include:

- Multi-provider AI support
- Context caching
- Retrieval reranking
- Parallel document retrieval
- Background processing
- Streaming responses
- Incremental indexing
- Vector database integration

---

# Summary

The architectural decisions behind ESG Prism prioritize explainability, modularity, and maintainability while leveraging Retrieval-Augmented Generation to improve the quality and reliability of AI-generated ESG assessments.

Each major technology and design choice was selected to support a production-oriented workflow that can evolve as retrieval strategies, AI models, and reporting requirements continue to mature.
