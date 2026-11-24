// Keep only simple formatting tags from rich-text HTML (scholarship descriptions are written in the
// Django admin's CKEditor). Scripts, styles, event handlers, attributes and unknown tags are dropped.
// String-based so it works both at build time (pre-rendered pages) and in the browser.

const ALLOWED_TAGS = new Set([
  'p', 'br', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 'a', 'h2', 'h3', 'h4', 'blockquote',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span',
]);
const DROP_WITH_CONTENT = ['script', 'style', 'iframe', 'object', 'embed', 'form', 'textarea', 'select', 'button'];

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  let out = html.replace(/<!--[\s\S]*?-->/g, '');
  for (const tag of DROP_WITH_CONTENT) {
    out = out.replace(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}\\s*>`, 'gi'), '');
    out = out.replace(new RegExp(`<${tag}\\b[^>]*>`, 'gi'), '');
  }
  out = out.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (_match, slash: string, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return '';
    if (slash) return `</${tag}>`;
    if (tag === 'a') {
      const href = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
      const url = href ? href[1] ?? href[2] ?? href[3] ?? '' : '';
      return /^https?:\/\//i.test(url)
        ? `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer nofollow">`
        : '<a>';
    }
    return tag === 'br' ? '<br>' : `<${tag}>`;
  });
  // Any stray "<" left over (e.g. an unclosed tag) is shown as text, not parsed
  return out.replace(/<(?![a-z/])/gi, '&lt;');
};

const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&lt;': '<', '&gt;': '>',
  '&rsquo;': '’', '&lsquo;': '‘', '&ldquo;': '“', '&rdquo;': '”', '&ndash;': '–', '&mdash;': '—',
};

// Plain-text version, e.g. for meta descriptions
export const htmlToText = (html: string): string =>
  (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e.toLowerCase()] ?? e)
    .replace(/\s+/g, ' ')
    .trim();
