interface SearchResult {
  text: string;
  relevanceScore: number;
  source?: string;
}

interface BucketSearchResult {
  results: SearchResult[];
  totalResults: number;
  hasMore: boolean;
}

/**
 * Performs a simple semantic search in the medical data bucket
 * 
 * TODO: Future improvements
 * - Implement vector embeddings for better semantic matching
 * - Add support for medical terminology synonyms
 * - Integrate with a proper vector database
 * - Add support for multi-language queries
 */
export async function fetchContextFromBucket(query: string): Promise<BucketSearchResult> {
  try {
    // Normalize query for search
    const normalizedQuery = normalizeText(query);
    const keywords = extractKeywords(normalizedQuery);
    
    // Mock bucket data - replace with actual bucket integration
    const results = await searchInBucket(keywords);
    
    if (results.length === 0) {
      return {
        results: [],
        totalResults: 0,
        hasMore: false
      };
    }

    // Sort by relevance and limit to top 3 results
    const topResults = results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);

    return {
      results: topResults,
      totalResults: results.length,
      hasMore: results.length > 3
    };
  } catch (error) {
    console.error('Error fetching context from bucket:', error);
    throw new Error('Falha ao buscar dados do repositório médico');
  }
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function extractKeywords(text: string): string[] {
  // Remove common stop words and extract meaningful medical terms
  const stopWords = new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'e', 'ou', 'de', 'da', 'do']);
  return text
    .split(/\s+/)
    .filter(word => !stopWords.has(word) && word.length > 2);
}

async function searchInBucket(keywords: string[]): Promise<SearchResult[]> {
  // TODO: Replace with actual bucket search implementation
  // This is a mock implementation for development
  const mockData: SearchResult[] = [
    {
      text: "A febre alta (>38.5°C) associada a cefaleia e mialgia sugere quadro viral agudo.",
      relevanceScore: 0.85,
      source: "Manual de Doenças Infecciosas"
    },
    {
      text: "Pacientes com dengue podem apresentar febre alta, cefaleia intensa e dor retroorbital.",
      relevanceScore: 0.75,
      source: "Protocolo de Manejo da Dengue"
    },
    {
      text: "O diagnóstico diferencial de febre alta inclui infecções virais, bacterianas e doenças reumatológicas.",
      relevanceScore: 0.65,
      source: "Medicina Interna"
    }
  ];

  // Simulate search delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return mockData;
}