import sanitizeHtmlLib, { type IOptions } from 'sanitize-html';

const DEFAULT_OPTIONS: IOptions = {
  allowedTags: ['strong', 'b', 'em', 'i', 'br', 'span', 'a', 'ul', 'ol', 'li', 'p'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    span: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
};

// Para contenido largo tipo documento legal (WYSIWYG de Directus): además de
// lo básico, permite encabezados y listas anidadas.
export const LEGAL_CONTENT_OPTIONS: IOptions = {
  allowedTags: ['h2', 'h3', 'strong', 'b', 'em', 'i', 'br', 'span', 'a', 'ul', 'ol', 'li', 'p'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    span: ['class'],
    ol: ['type'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
};

export function sanitizeHtml(html: string, options: IOptions = DEFAULT_OPTIONS): string {
  return sanitizeHtmlLib(html, options);
}

export function escapeJsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
