import numpy as np
from google import genai
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

client = genai.Client()

def chunk_text(text: str, chunk_size: int = 300, overlap: int = 50) -> list:
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    return chunks


def embed_chunks(chunks: list) -> np.ndarray:
    embeddings = []
    for chunk in chunks:
        result = client.models.embed_content(
            model="text-embedding-004",
            contents=chunk
        )
        embeddings.append(result.embeddings[0].values)
    return np.array(embeddings)


def cosine_similarity(query_vec: np.ndarray, chunk_vecs: np.ndarray) -> np.ndarray:
    query_norm = query_vec / (np.linalg.norm(query_vec) + 1e-10)
    chunk_norms = chunk_vecs / (
        np.linalg.norm(chunk_vecs, axis=1, keepdims=True) + 1e-10
    )
    return np.dot(chunk_norms, query_norm)


def semantic_search(
    query: str,
    chunks: list,
    chunk_embeddings: np.ndarray,
    top_k: int = 3
) -> list:
    result = client.models.embed_content(
    model="text-embedding-004",
    contents=query
)
query_embedding = np.array(result.embeddings[0].values)
    scores = cosine_similarity(query_embedding, chunk_embeddings)
    top_indices = np.argsort(scores)[-top_k:][::-1]
    return [(chunks[i], float(scores[i])) for i in top_indices]


def retrieve_top_context(all_texts: list, company_name: str) -> list:
    # Step 1 — Chunk all texts
    all_chunks = []
    for text in all_texts:
        if text and len(text.strip()) > 50:
            all_chunks.extend(chunk_text(text))

    if not all_chunks:
        return ["No sufficient text content found to analyze."]

    # Cap chunks to avoid too many API calls
    all_chunks = all_chunks[:40]
    print(f"Total chunks: {len(all_chunks)}")

    # Step 2 — Embed all chunks via Gemini
    print("Embedding chunks via Gemini...")
    chunk_embeddings = embed_chunks(all_chunks)
    print("Embedding complete.")

    # Step 3 — ESG domain queries
    esg_queries = [
        f"{company_name} environmental carbon emissions climate net zero renewable energy",
        f"{company_name} social labor practices diversity inclusion human rights workers",
        f"{company_name} governance board ethics compliance transparency corruption",
        f"{company_name} ESG rating score sustainability report performance index",
        f"{company_name} controversy scandal violation fine penalty risk lawsuit"
    ]

    retrieved = []
    seen = set()

    for query in esg_queries:
        results = semantic_search(query, all_chunks, chunk_embeddings, top_k=3)
        for chunk, score in results:
            if chunk not in seen and score > 0.2:
                seen.add(chunk)
                retrieved.append((chunk, score))

    retrieved.sort(key=lambda x: x[1], reverse=True)
    top_chunks = [chunk for chunk, score in retrieved[:12]]

    print(f"Retrieved {len(top_chunks)} relevant chunks.")
    return top_chunks


# Test
if __name__ == "__main__":
    sample_texts = [
        """Tata Motors has committed to achieving Net Zero greenhouse gas emissions 
        by 2040 for its passenger vehicle business. The company has invested heavily 
        in electric vehicles and renewable energy sources across its manufacturing 
        plants.""",
        """The company maintains strong labor practices with zero tolerance for 
        child labor. Diversity initiatives have increased female representation 
        in leadership to 18%."""
    ]

    print("\n--- Testing RAG Pipeline ---\n")
    top_chunks = retrieve_top_context(sample_texts, "Tata Motors")
    print("\n--- Top Chunks ---")
    for i, chunk in enumerate(top_chunks, 1):
        print(f"\nChunk {i}: {chunk[:200]}")