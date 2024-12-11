import { INSTRUCTIONS } from '../../config/instructions';
import { formatClinicalResponse } from '../utils/response-formatter';
import { fetchFromGoogleCloud } from '../utils/storage';
import { QueryAnalyzer } from '../utils/query-analyzer';
import { ClinicalContext } from '../../types/medical';

export interface ChatResponse {
  content: string;
  references?: string[];
  certaintyLevel: 'high' | 'medium' | 'low';
  responseType: 'conceptual' | 'diagnostic' | 'therapeutic';
  evidenceLevel?: string;
  queryType?: string;
}

export async function generateChatResponse(
  query: string,
  specialty: string
): Promise<ChatResponse> {
  try {
    // Analyze query to determine type and extract key medical concepts
    const queryAnalyzer = new QueryAnalyzer();
    const { queryType, medicalConcepts } = queryAnalyzer.analyze(query);
    
    // Fetch relevant context from bucket using medical concepts
    const context = await fetchFromGoogleCloud(query, specialty, medicalConcepts);
    
    // Generate clinical reasoning if appropriate for query type
    const clinicalReasoning = shouldIncludeReasoning(queryType) 
      ? generateClinicalReasoning(context, queryType)
      : undefined;

    const response = formatClinicalResponse({
      query,
      context,
      responseType: queryType,
      instructions: INSTRUCTIONS,
      clinicalReasoning,
    });

    return {
      content: response.content,
      references: response.references,
      certaintyLevel: response.certaintyLevel,
      responseType: queryType,
      evidenceLevel: response.evidenceLevel,
      queryType
    };
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw new Error('Não foi possível processar sua solicitação no momento.');
  }
}

function generateClinicalReasoning(
  context: ClinicalContext,
  queryType: string
): string {
  if (!context?.clinicalCorrelation) {
    return 'Dados insuficientes para análise clínica detalhada';
  }

  let reasoning = 'Raciocínio Clínico:\n\n';

  switch (queryType) {
    case 'diagnostic':
      reasoning += formatDiagnosticReasoning(context);
      break;
    case 'therapeutic':
      reasoning += formatTherapeuticReasoning(context);
      break;
    default:
      reasoning += formatGeneralReasoning(context);
  }

  return reasoning;
}

function shouldIncludeReasoning(queryType: string): boolean {
  return ['diagnostic', 'therapeutic'].includes(queryType);
}