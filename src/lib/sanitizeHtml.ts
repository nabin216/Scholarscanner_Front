// Keep only simple formatting tags from rich-text HTML (scholarship descriptions are written in the
// Django admin's CKEditor). Scripts, styles, event handlers and unknown tags are dropped.

const ALLOWED_TAGS = new Set([
  'P', 'BR', 'UL', 'OL', 'LI', 'STRONG', 'B', 'EM', 'I', 'U', 'A', 'H2', 'H3', 'H4', 'BLOCKQUOTE',
  'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'SPAN',
]);
const DROP_WITH_CONTENT = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'INPUT', 'BUTTON']);

const cleanNode = (node: Node, doc: Document): Node | null => {
  if (node.nodeType === Node.TEXT_NODE) {
    return doc.createTextNode(node.textContent || '');
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const el = node as Element;
  if (DROP_WITH_CONTENT.has(el.tagName)) {
    return null;
  }

  const children = Array.from(el.childNodes)
    .map((child) => cleanNode(child, doc))
    .filter((child): child is Node => child !== null);

  // Unknown tag: keep its text, drop the tag itself
  if (!ALLOWED_TAGS.has(el.tagName)) {
    const fragment = doc.createDocumentFragment();
    children.forEach((child) => fragment.appendChild(child));
    return fragment;
  }

  const clean = doc.createElement(el.tagName.toLowerCase());
  if (el.tagName === 'A') {
    const href = el.getAttribute('href') || '';
    if (/^https?:\/\//i.test(href)) {
      clean.setAttribute('href', href);
      clean.setAttribute('target', '_blank');
      clean.setAttribute('rel', 'noopener noreferrer nofollow');
    }
  }
  children.forEach((child) => clean.appendChild(child));
  return clean;
};

export const sanitizeHtml = (html: string): string => {
  if (!html || typeof window === 'undefined') return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const container = doc.createElement('div');
  Array.from(doc.body.childNodes).forEach((child) => {
    const clean = cleanNode(child, doc);
    if (clean) container.appendChild(clean);
  });
  return container.innerHTML;
};

// Plain-text version, e.g. for meta descriptions
export const htmlToText = (html: string): string =>
  (html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
