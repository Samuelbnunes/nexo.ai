import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Carrega as variáveis de ambiente
load_dotenv()

# Instancia o cliente da nova biblioteca
API_KEY = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=API_KEY) if API_KEY else None

def generate_improved_resume(resume_text: str, target_job: str, niche: str = "") -> str:
    """
    Envia o currículo para o Google Gemini e retorna um currículo
    completo reescrito e estilizado em HTML (A4), pronto para PDF.
    """
    if not client:
        return "<p>Erro: Chave GOOGLE_API_KEY não configurada no .env</p>"

    try:
        prompt = f"""
Você é um designer de documentos profissionais de elite e especialista em recrutamento tech/RH.

Sua tarefa é duplo-foco:
1. REESCREVER o currículo abaixo em conteúdo profissional, otimizado para a vaga de **{target_job}** no nicho **{niche if niche else null}**. Use verbos de ação e métricas quantificáveis.
2. ESTILIZAR o resultado como um currículo HTML **moderno, elegante e sofisticado**, inspirado em layouts de design premium, garantindo que todo o conteúdo caiba perfeitamente em uma ou mais folhas A4 para impressão.

=== REGRAS DE CONTEÚDO ===
- Mantenha TODOS os dados pessoais (nome, email, telefone, endereço, LinkedIn) exatamente como estão.
- Reescreva o resumo/objetivo com foco extremo no fit com a vaga desejada.
- Reescreva as experiências focando em conquistas, não apenas responsabilidades.
- Reorganize habilidades em ordem de relevância para a vaga.
- Mantenha a formação acadêmica como está.

=== REGRAS DE HTML/CSS PARA LAYOUT A4 ===
- Retorne APENAS o conteúdo HTML dentro de uma tag <div class="resume"> (sem <!DOCTYPE>, <html>, <body>, <head>).
- Use SOMENTE estilos inline (style="..."). Use divs e spans. NÃO use tabelas.
- **LAYOUT DE DUAS COLUNAS (MODERNO):** Use Flexbox ou posicionamento inline para criar uma barra lateral estreita (aprox. 30%) e uma coluna principal larga (aprox. 70%).
- **AJUSTE ESTRITO A4:** O layout deve ser otimizado para impressão A4 (210mm x 297mm). Use `box-sizing: border-box;` na div principal. Mantenha margens internas sutis (ex: 10mm) e controle o espaçamento entre itens (`margin-bottom`, `padding`) para que NADA transborde para uma segunda página. Se o currículo original for longo, condense as descrições de experiências mais antigas.

=== ESTILIZAÇÃO E PALETA ===
- **Fonte:** Use a pilha de fontes "Segoe UI", Roboto, Helvetica, Arial, sans-serif para um visual limpo e moderno. Tamanho base: 9pt ou 10pt.
- **Nome do Candidato:** 24pt, negrito, cor #1A202C, no topo da coluna principal ou centralizado no topo.
- **Barra Lateral (Lateral Sidebar):** Cor de fundo #F7FAFC. Coloque aqui: Dados de Contato, Habilidades (Hard & Soft Skills em listas organizadas), Idiomas e Educação. Use ícones HTML simples (como • ou ▪) ou entidades HTML para contato se necessário, de forma sutil.
- **Coluna Principal (Main Body):** Cor de fundo #FFFFFF. Coloque aqui: Resumo Profissional e Experiência Profissional.
- **Títulos de Seção:** Use maiúsculas, 11pt, negrito, cor #2D3748. Adicione uma borda inferior sutil de 1px em #E2E8F0 abaixo de cada título de seção.
- **Datas e Locais:** Use uma cor mais clara, como #718096, e itálico sutil para diferenciar.
- **Limpeza:** Design minimalista. Use espaçamento consistente. Evite cores vibrantes demais.

CURRÍCULO ORIGINAL:
---
{resume_text}
---

RETORNE APENAS O BLOCO HTML ABAIXO (começando com <div class="resume"):
"""

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=(
                    "Você é um especialista em RH, recrutamento tech e design de documentos. "
                    "Você reescreve e estiliza currículos em HTML e CSS puro com estilos inline, "
                    "prontos para exportação em PDF no formato A4. "
                    "Sua saída é SEMPRE um bloco HTML começando com <div — nunca texto puro, "
                    "nunca markdown, nunca comentários, nunca explicações."
                )
            )
        )

        raw = response.text.strip()

        # Limpa caso a IA coloque blocos de código markdown (```html ... ```)
        if raw.startswith("```"):
            lines = raw.split("\n")
            raw = "\n".join(lines[1:-1]) if lines[-1].strip() == "```" else "\n".join(lines[1:])

        return raw

    except Exception as e:
        print(f"Erro no Gemini: {e}")
        return f"<p style='color:red'>Erro ao processar o currículo com a IA: {e}</p>"
