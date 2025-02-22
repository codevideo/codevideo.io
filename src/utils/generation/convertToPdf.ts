import { marked } from 'marked'; // For markdown to HTML conversion
import { generateHtmlDocument } from './generateHtmlDocument';

export const convertToPdf = async (markdown: string) => {
    const html = await marked(markdown);
    const printStyles = `
      @media print {
        body { margin: 2.5cm; }
      }
    `;

    const fullHtml = generateHtmlDocument(html, printStyles, 'CodeVideo PDF Export');
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
        console.error('Failed to open print window');
        return;
    }

    try {
        printWindow.document.write(fullHtml);
        printWindow.document.close();
        printWindow.focus();

        // Allow time for styles to load before printing
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    } catch (error) {
        console.error('Error during PDF conversion:', error);
        printWindow.close();
    }
};