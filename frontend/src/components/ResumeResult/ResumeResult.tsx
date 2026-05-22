import React, { useRef, useEffect, useState } from 'react';
import styles from './ResumeResult.module.css';

interface Props {
  improved: string;
  onReset: () => void;
}

const MM_TO_PX   = 3.7795;            // 1mm em px a 96 DPI
const A4_H_PX    = 297 * MM_TO_PX;    // altura total da página A4 em px
const ZOOM_STEP  = 0.1;
const ZOOM_MIN   = 0.4;
const ZOOM_MAX   = 1.5;

/* ─── Gera janela de impressão e abre diálogo de PDF ─────────────────── */
function exportToPDF(htmlContent: string) {
  const win = window.open('', '_blank', 'width=900,height=700');
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Currículo – Nexo.ai</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#e8e8e8;font-family:Arial,Helvetica,sans-serif;font-size:10pt;}
    .page{width:210mm;min-height:297mm;background:#fff;margin:20px auto;padding:10mm 15mm;box-shadow:0 4px 20px rgba(0,0,0,.15);}
    @media print{
      body{background:none;}
      .page{margin:0;padding:10mm 15mm;box-shadow:none;width:210mm;min-height:297mm;}
      @page{size:A4 portrait;margin:0;}
    }
  </style>
</head>
<body>
  <div class="page">${htmlContent}</div>
  <script>window.addEventListener('load',()=>setTimeout(()=>window.print(),400));<\/script>
</body>
</html>`);
  win.document.close();
}

/* ─── Componente principal ───────────────────────────────────────────── */
export default function ResumeResult({ improved, onReset }: Props) {
  const hiddenRef        = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(1);
  const [zoom, setZoom]  = useState(1);

  /* Mede o conteúdo numa div oculta para calcular quantas páginas A4 cabem */
  useEffect(() => {
    if (!hiddenRef.current) return;
    const t = setTimeout(() => {
      const h = hiddenRef.current!.scrollHeight;
      setNumPages(Math.max(1, Math.ceil(h / A4_H_PX)));
    }, 120);
    return () => clearTimeout(t);
  }, [improved]);

  const zoomIn    = () => setZoom(z => Math.min(+(z + ZOOM_STEP).toFixed(1), ZOOM_MAX));
  const zoomOut   = () => setZoom(z => Math.max(+(z - ZOOM_STEP).toFixed(1), ZOOM_MIN));
  const zoomReset = () => setZoom(1);

  return (
    <div className={styles.wrapper}>

      {/* Div oculta usada APENAS para medir a altura real do conteúdo */}
      <div
        ref={hiddenRef}
        className={styles.hiddenMeasure}
        dangerouslySetInnerHTML={{ __html: improved }}
      />

      {/* ── Barra de ações ── */}
      <div className={styles.actionBar}>
        <button className={styles.btnBack} onClick={onReset}>← Nova análise</button>
        <button className={styles.btnDownloadPdf} onClick={() => exportToPDF(improved)}>
          📄 Baixar PDF
        </button>
      </div>

      {/* ── Banner de sucesso ── */}
      <div className={styles.successBanner}>
        <span className={styles.successIcon}>✅</span>
        <div>
          <p className={styles.successTitle}>Currículo otimizado com sucesso!</p>
          <p className={styles.successSub}>
            Revise abaixo e clique em <strong>Baixar PDF</strong> para enviar ao recrutador.
          </p>
        </div>
      </div>

      {/* ── Preview ── */}
      <div className={styles.previewWrapper}>

        {/* Header com controles de zoom */}
        <div className={styles.previewHeader}>
          <span>✨ Currículo Reescrito e Estilizado pela IA</span>
          <div className={styles.zoomControls}>
            <button className={styles.zoomBtn} onClick={zoomOut} disabled={zoom <= ZOOM_MIN} title="Diminuir zoom">−</button>
            <button className={styles.zoomLabel} onClick={zoomReset} title="Redefinir zoom">{Math.round(zoom * 100)}%</button>
            <button className={styles.zoomBtn} onClick={zoomIn}  disabled={zoom >= ZOOM_MAX} title="Aumentar zoom">+</button>
          </div>
        </div>

        {/* Área cinza de "impressão" */}
        <div className={styles.previewScroll}>

          {/* Wrapper escalável com zoom */}
          <div
            className={styles.zoomWrapper}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              // Compensa o espaço que o scale remove/adiciona verticalmente
              marginBottom: `calc((${zoom} - 1) * ${numPages * 297}mm + ${(numPages - 1) * 16}px)`,
            }}
          >
            {/* ── Páginas A4 reais ── */}
            {Array.from({ length: numPages }, (_, i) => (
              <React.Fragment key={i}>

                {/* Gap cinza entre páginas (igual ao fundo) */}
                {i > 0 && <div className={styles.pageGap} />}

                {/* Janela de 297mm que "corta" o conteúdo na posição certa */}
                <div className={styles.a4PageOuter}>
                  <div
                    className={styles.a4PageInner}
                    style={{ top: `-${i * A4_H_PX}px` }}
                    dangerouslySetInnerHTML={{ __html: improved }}
                  />
                </div>

              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
