import { useEffect, useRef, type CanvasHTMLAttributes } from "react";

export function PDFViewer(props: { file: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        async function loadPDF() {
            const pdfjsLib = await import("pdfjs-dist");
            const { GlobalWorkerOptions, getDocument } = pdfjsLib;

            GlobalWorkerOptions.workerSrc =
                "https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.mjs";

            const loadingTask = getDocument(props.file);
            loadingTask.promise.then(async (pdf) => {
                let page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = canvasRef.current;
                const context = canvas?.getContext("2d");

                if (!canvas) return;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (!context) return;

                page.render({
                    canvasContext: context,
                    viewport: viewport,
                });
            });
        }

        loadPDF();
    });

    return (
        <div className="pdf-reader" id="pdf-reader">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
