import fitz  # PyMuPDF
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extrai o texto de um arquivo PDF usando o PyMuPDF.
    
    Args:
        file_bytes: O conteúdo binário do PDF recebido pelo upload.
        
    Returns:
        String contendo todo o texto extraído do PDF.
    """
    text = ""
    try:
        # Carrega o PDF a partir dos bytes na memória
        pdf_document = fitz.open(stream=file_bytes, filetype="pdf")
        
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
            
        pdf_document.close()
        return text
    except Exception as e:
        print(f"Erro ao extrair PDF: {e}")
        return ""
