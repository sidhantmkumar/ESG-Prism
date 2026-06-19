import numpy as np
from sentence_transformers import SentenceTransformer
import os

# Load the embedding model once at startup (downloads ~80MB first time)
print("Loading embedding model...")
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
print("Embedding model ready.")


def chunk_text(text: str, chunk_size: int = 300, overlap: int = 50) -> list:
    """
    Splits text into overlapping chunks of ~300 words.
    Overlap ensures we don't lose context at chunk boundaries.
    """
    words = text.split()
    chunks = []

    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)

    return chunks


def embed_chunks(chunks: list) -> np.ndarray:
    """
    Converts text chunks into numerical vectors
    using the local sentence-transformer model.
    """
    return embedding_model.encode(chunks, show_progress_bar=False)


def cosine_similarity(query_vec: np.ndarray, chunk_vecs: np.ndarray) -> np.ndarray:
    """
    Computes similarity between query and all chunks.
    Higher score = more relevant chunk.
    """
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
    """
    Finds the top_k most relevant chunks for a given query.
    """
    query_embedding = embedding_model.encode([query])[0]
    scores = cosine_similarity(query_embedding, chunk_embeddings)
    top_indices = np.argsort(scores)[-top_k:][::-1]
    return [(chunks[i], float(scores[i])) for i in top_indices]


def retrieve_top_context(all_texts: list, company_name: str) -> list:
    """
    Full RAG pipeline:
    1. Chunk all input texts
    2. Embed all chunks locally
    3. Run 5 ESG-domain queries against embeddings
    4. Return top unique chunks for Claude to analyze
    """

    # Step 1 — Chunk all texts
    all_chunks = []
    for text in all_texts:
        if text and len(text.strip()) > 50:
            all_chunks.extend(chunk_text(text))

    if not all_chunks:
        return ["No sufficient text content found to analyze."]

    print(f"Total chunks created: {len(all_chunks)}")

    # Step 2 — Embed all chunks
    print("Embedding chunks...")
    chunk_embeddings = embed_chunks(all_chunks)
    print("Embedding complete.")

    # Step 3 — Run ESG-specific domain queries
    # These 5 queries are what make this domain-smart
    # rather than generic retrieval
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
            # Only add if not duplicate and relevance score is decent
            if chunk not in seen and score > 0.2:
                seen.add(chunk)
                retrieved.append((chunk, score))

    # Step 4 — Sort by score and return top 12 chunks
    retrieved.sort(key=lambda x: x[1], reverse=True)
    top_chunks = [chunk for chunk, score in retrieved[:12]]

    print(f"Retrieved {len(top_chunks)} relevant chunks for analysis.")
    return top_chunks


# Test
if __name__ == "__main__":
    sample_texts = [
        """Tata Motors has committed to achieving Net Zero greenhouse gas emissions 
        by 2040 for its passenger vehicle business. The company has invested heavily 
        in electric vehicles and renewable energy sources across its manufacturing 
        plants. Carbon emissions have been reduced by 35% since 2019 through 
        energy efficiency programs and solar installations.""",

        """The company maintains strong labor practices with zero tolerance for 
        child labor or forced labor across its supply chain. Diversity initiatives 
        have increased female representation in leadership to 18%. Employee safety 
        incidents reduced by 40% following new workplace protocols in 2023.""",

        """Tata Motors board consists of 12 independent directors with clear 
        separation between CEO and Chairman roles. The company has robust 
        anti-corruption policies and whistleblower protection mechanisms. 
        No significant governance violations reported in the last 3 years."""
    ]

    print("\n--- Testing RAG Pipeline ---\n")
    top_chunks = retrieve_top_context(sample_texts, "Tata Motors")

    print("\n--- Top Retrieved Chunks ---\n")
    for i, chunk in enumerate(top_chunks, 1):
        print(f"Chunk {i}:\n{chunk[:200]}\n")