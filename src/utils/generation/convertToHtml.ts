import { marked } from 'marked'; // For markdown to HTML conversion
import { generateHtmlDocument } from './generateHtmlDocument';

// TODO: move into codevideo-doc-gen?
export const convertToHtml = async (markdown: string) => {
    const html = await marked(markdown);
    const fullHtml = generateHtmlDocument(html, '', 'CodeVideo HTML Export');

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    try {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'codevideo-html-export.html';
        link.click();
    } finally {
        URL.revokeObjectURL(url);
    }
};
