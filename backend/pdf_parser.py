import pypdf
import os


def extract_pdf(file_path: str) -> str:
    """
    Extracts all text from a PDF file.
    Accepts a file path string.
    """
    try:
        text = ""
        with open(file_path, "rb") as f:
            reader = pypdf.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"

        if not text.strip():
            return "PDF appears to be scanned or image-based — no extractable text found."

        # Cap at 15000 chars to avoid token overflow
        return text[:15000]

    except Exception as e:
        return f"PDF extraction failed: {str(e)}"


# Test
if __name__ == "__main__":
    # Create a dummy test to confirm import works
    print("PDF parser loaded successfully.")
    print("Ready to extract text from uploaded ESG reports.")