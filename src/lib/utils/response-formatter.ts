import { Instructions } from '../../types/instructions';
import { ChatResponse } from '../services/chat-service';

interface ClinicalContext {
  symptoms?: string[];
  clinicalCorrelation?: string;
  differentialDiagnosis?: string[];
  treatments?: string[];
  considerations?: string;
  monitoring?: string;
  references?: string[];
  confidence?: number;
  evidenceLevel?: string;
  context?: string;
}

interface FormatResponseParams {
  query: string;
  context: ClinicalContext;
  responseType: ChatResponse['responseType'];
  instructions: Instructions;
  clinicalReasoning?: string;
}

interface FormattedResponse extends ChatResponse {
  content: string;
  evidenceLevel?: string;
}

export function formatClinicalResponse({
  query,
  context,
  responseType,
  instructions,
  clinicalReasoning,
}: FormatResponseParams): FormattedResponse {
  const { sections } = instructions;
  
  let content = '';
  let certaintyLevel: ChatResponse['certaintyLevel'] = 'medium';
  
  // Add clinical reasoning if provided
  if (clinicalReasoning) {
    content += `{.\n${clinicalReasoning}\n.}\n\n`;
  }

  if (responseType === 'diagnostic') {
    content = formatDiagnosticResponse(context, sections);
  } else if (responseType === 'therapeutic') {
    content = formatTherapeuticResponse(context, sections);
  } else {
    content = formatConceptualResponse(context, sections);
  }
  
  const references = context.references || [];
  const evidenceLevel = context.evidenceLevel;
  
  certaintyLevel = determineCertaintyLevel(context);
  
  // Add references section if available
  if (references.length > 0) {
    content += '\n\nReferências:\n';
    references.forEach((ref, index) => {
      content += `${index + 1}. ${ref}\n`;
    });
  }

  // Add evidence level if available
  if (evidenceLevel) {
    content += `\nNível de Evidência: ${evidenceLevel}`;
  }

  return {
    content,
    references,
    certaintyLevel,
    responseType,
    evidenceLevel,
  };
}

function formatDiagnosticResponse(context: any, sections: Instructions['sections']): string {
  return `{.
1. Análise dos Sintomas:
   ${context.symptoms?.join('\n   ') || 'Dados insuficientes para análise completa'}

2. Correlação Clínica:
   ${context.clinicalCorrelation || 'Análise pendente de mais informações'}

3. Diagnósticos Diferenciais:
   ${context.differentialDiagnosis?.join('\n   ') || 'Não foi possível estabelecer diagnósticos diferenciais'}
.}`;
}

function formatTherapeuticResponse(context: any, sections: Instructions['sections']): string {
  const treatments = context.treatments || [];
  return `{.
1. Abordagem Terapêutica:
   ${treatments.map((t: any, i: number) => `${i + 1}. ${t}`).join('\n   ') || 'Tratamento específico não disponível'}

2. Considerações Importantes:
   ${context.considerations || 'Sem considerações específicas disponíveis'}

3. Monitoramento:
   ${context.monitoring || 'Protocolo de monitoramento não especificado'}
.}`;
}

function formatConceptualResponse(context: any, sections: Instructions['sections']): string {
  return `{.
1. Conceito:
   ${context.concept || 'Conceito não disponível na base de dados'}

2. Contextualização:
   ${context.context || 'Contextualização pendente de mais informações'}

3. Aplicação Prática:
   ${context.practicalApplication || 'Aplicação prática não especificada'}
.}`;
}

function determineCertaintyLevel(context: any): ChatResponse['certaintyLevel'] {
  if (!context || Object.keys(context).length === 0) {
    return 'low';
  }
  if (context.confidence && context.confidence > 0.8) {
    return 'high';
  }
  return 'medium';
}