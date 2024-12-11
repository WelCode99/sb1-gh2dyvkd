import { QueryType, MedicalConcept } from '../../types/medical';

export class QueryAnalyzer {
  private diagnosticKeywords = new Set([
    'diagnóstico', 'sintomas', 'sinais', 'apresenta', 'manifesta',
    'quadro clínico', 'exames', 'investigação'
  ]);

  private therapeuticKeywords = new Set([
    'tratamento', 'terapia', 'medicamento', 'conduta', 'manejo',
    'prescrição', 'intervenção', 'procedimento'
  ]);

  analyze(query: string): { queryType: QueryType; medicalConcepts: MedicalConcept[] } {
    const normalizedQuery = query.toLowerCase();
    const words = normalizedQuery.split(/\s+/);
    
    // Determine query type
    const queryType = this.determineQueryType(words);
    
    // Extract medical concepts
    const medicalConcepts = this.extractMedicalConcepts(normalizedQuery);

    return {
      queryType,
      medicalConcepts
    };
  }

  private determineQueryType(words: string[]): QueryType {
    const hasTherapeuticKeywords = words.some(word => 
      this.therapeuticKeywords.has(word)
    );
    
    const hasDiagnosticKeywords = words.some(word => 
      this.diagnosticKeywords.has(word)
    );

    if (hasTherapeuticKeywords) return 'therapeutic';
    if (hasDiagnosticKeywords) return 'diagnostic';
    return 'conceptual';
  }

  private extractMedicalConcepts(query: string): MedicalConcept[] {
    // TODO: Implement more sophisticated medical concept extraction
    // This is a basic implementation that should be enhanced with:
    // - Medical terminology database
    // - NLP for medical entity recognition
    // - Concept disambiguation
    
    const concepts: MedicalConcept[] = [];
    
    // Basic pattern matching for demonstration
    if (query.includes('dor')) {
      concepts.push({
        term: 'dor',
        type: 'symptom',
        confidence: 0.8
      });
    }
    
    return concepts;
  }
}