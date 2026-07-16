import { marked } from 'marked';
import { sanitizeHtml } from '@lib/html/sanitize';

const ALLOWED_TAGS = [
  'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'br',
  'a', 'blockquote', 'code', 'pre', 'hr',
];

// Convierte el markdown de un BlogPost.content a HTML seguro para set:html.
export function renderMarkdown(content: string): string {
  const html = marked.parse(content, { async: false }) as string;
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
}
