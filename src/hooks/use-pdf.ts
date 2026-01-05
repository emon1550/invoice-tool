
import { useCallback, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function usePDFGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = useCallback(async (element: HTMLElement, fileName: string) => {
        try {
            setIsGenerating(true);

            // Wait for any images/fonts to settle
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(element, {
                scale: 2, // Higher resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');

            // A4 dimensions in mm
            const pdfWidth = 210;
            const pdfHeight = 297;

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);

            let pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            let renderWidth = pdfWidth;

            // If image is taller than A4 (with slight tolerance), scale it down to fit
            if (pdfImgHeight > pdfHeight + 1.0) {
                const ratio = pdfHeight / pdfImgHeight;
                pdfImgHeight = pdfHeight;
                renderWidth = pdfWidth * ratio;

                // Center horizontally if scaled down
                const xOffset = (pdfWidth - renderWidth) / 2;
                pdf.addImage(imgData, 'PNG', xOffset, 0, renderWidth, pdfImgHeight);
            } else {
                // Force full width (no horizontal margins added by PDF generator)
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfImgHeight);
            }

            pdf.save(fileName);

            return true;
        } catch (error) {
            console.error('PDF Generation Failed', error);
            return false;
        } finally {
            setIsGenerating(false);
        }
    }, []);

    return { generatePDF, isGenerating };
}
