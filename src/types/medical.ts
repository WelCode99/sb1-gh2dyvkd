export interface ClinicalContext {
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
  concept?: string;
  practicalApplication?: string;
}

export interface MedicalConcept {
  term: string;
  type: 'symptom' | 'condition' | 'treatment' | 'anatomy' | 'procedure';
  confidence: number;
}

export type QueryType = 'diagnostic' | 'therapeutic' | 'conceptual';

export interface Protocol {
  id: string;
  title: string;
  type: 'guideline' | 'flowchart' | 'table';
  content: string;
  specialty: string;
  lastUpdated: Date;
  evidenceLevel: 'A' | 'B' | 'C';
  references: string[];
}

export interface TreatmentComparison {
  id: string;
  specialty: string;
  category: string;
  medications: Array<{
    name: string;
    dosage: string;
    indications: string[];
    contraindications: string[];
    sideEffects: string[];
    evidenceLevel: 'A' | 'B' | 'C';
  }>;
}

export interface ClinicalCase {
  id: string;
  specialty: string;
  presentation: string;
  clinicalData: Record<string, string | number>;
  reasoning: string;
  differentialDiagnosis: string[];
  recommendedTests: string[];
  treatment: string;
  followUp: string;
  references: string[];
}