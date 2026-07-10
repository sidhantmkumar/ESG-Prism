# Performance

## Overview

ESG Prism is designed to deliver explainable ESG assessments with low end-to-end latency while maintaining response quality through Retrieval-Augmented Generation (RAG).

The overall execution time depends on several independent stages including evidence retrieval, context preparation, AI inference, and response rendering.

Rather than optimizing a single component, the system focuses on balancing retrieval quality, inference speed, and user experience.

---

# Analysis Pipeline

```mermaid
flowchart LR

A["User Request"]
--> B["Input Validation"]

B --> C["Evidence Retrieval"]

C --> D["Context Processing"]

D --> E["Prompt Construction"]

E --> F["Gemini Inference"]

F --> G["Structured Response"]

G --> H["Frontend Rendering"]
```

---

# Execution Stages

The ESG analysis workflow consists of multiple sequential stages.

| Stage | Responsibility |
|--------|----------------|
| Input Validation | Validate request payload |
| Evidence Retrieval | Collect relevant public information |
| Context Processing | Prepare retrieved content |
| Prompt Construction | Build structured AI prompt |
| AI Inference | Generate ESG assessment |
| Response Formatting | Structure output for frontend |
| Dashboard Rendering | Display assessment results |

---

# Performance Characteristics

The overall response time is influenced by:

- Search latency
- Network communication
- Prompt size
- Retrieved context volume
- AI inference time

Among these, AI inference generally represents the largest portion of request execution time.

---

# Retrieval Performance

Retrieval quality directly affects both response quality and latency.

The retrieval stage is responsible for:

- Collecting relevant information
- Eliminating irrelevant content
- Selecting contextual evidence

Providing excessive context increases inference time, while insufficient context may reduce assessment quality.

---

# Prompt Optimization

Prompt construction is designed to include only the information necessary for ESG evaluation.

Benefits include:

- Reduced token usage
- Faster inference
- Lower API cost
- More consistent responses

---

# Frontend Performance

The frontend leverages Next.js optimizations including:

- Component-based rendering
- Efficient routing
- Optimized production builds
- Lazy loading where appropriate

These optimizations improve responsiveness without increasing application complexity.

---

# Backend Performance

FastAPI enables efficient request handling through asynchronous processing.

Benefits include:

- Non-blocking request execution
- Efficient I/O operations
- Improved concurrency
- Lightweight API layer

---

# Scalability Considerations

The current architecture is appropriate for:

- Moderate request volumes
- Independent analyses
- Single-user workflows
- Development and demonstration environments

As usage grows, additional optimization strategies may be introduced.

---

# Potential Optimizations

Future improvements include:

- Response caching
- Retrieval result caching
- Parallel evidence retrieval
- Streaming AI responses
- Background task execution
- Incremental context generation

---

# Current Limitations

Performance depends on several external factors, including:

- Internet connectivity
- Search provider response time
- Gemini API latency
- Size of retrieved context

These dependencies introduce variability that is outside the application's direct control.

---

# Summary

The current implementation prioritizes reliable, explainable ESG analysis over aggressive optimization.

The modular architecture allows individual stages of the pipeline to be optimized independently as the application evolves, ensuring that improvements in retrieval, prompt construction, or inference can be introduced without significant architectural changes.
