type Citation = {
  sourceId: string;
  url: string;
  snippet: string;
};

export function formatCitation(citation: Citation) {
  return `${citation.sourceId}: ${citation.snippet} (${citation.url})`;
}
