import React, { useState } from 'react';
import { ClinicalCase } from '../../types/medical';
import { Button } from '../ui/Button';
import { generateChatResponse } from '../../lib/services/chat-service';

interface ClinicalCaseAnalyzerProps {
  specialty: string;
}

export const ClinicalCaseAnalyzer: React.FC<ClinicalCaseAnalyzerProps> = ({ specialty }) => {
  const [caseData, setCaseData] = useState<Partial<ClinicalCase>>({
    specialty,
    presentation: '',
    clinicalData: {},
  });
  const [analysis, setAnalysis] = useState<ClinicalCase | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await generateChatResponse(
        JSON.stringify(caseData),
        specialty
      );
      
      setAnalysis(JSON.parse(response.content) as ClinicalCase);
    } catch (error) {
      console.error('Error analyzing clinical case:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dados do Paciente
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Idade"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setCaseData(prev => ({
                  ...prev,
                  clinicalData: {
                    ...prev.clinicalData,
                    age: e.target.value
                  }
                }))}
              />
              <input
                type="text"
                placeholder="Comorbidades (separadas por vírgula)"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setCaseData(prev => ({
                  ...prev,
                  clinicalData: {
                    ...prev.clinicalData,
                    comorbidities: e.target.value
                  }
                }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dados Laboratoriais
            </label>
            <textarea
              placeholder="Insira os resultados de exames laboratoriais..."
              className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setCaseData(prev => ({
                ...prev,
                clinicalData: {
                  ...prev.clinicalData,
                  labResults: e.target.value
                }
              }))}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apresentação Clínica
          </label>
          <textarea
            value={caseData.presentation}
            onChange={(e) => setCaseData(prev => ({
              ...prev,
              presentation: e.target.value
            }))}
            className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descreva o caso clínico..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição de Imagens
          </label>
          <textarea
            placeholder="Descreva achados de imagem (ex: radiografia, tomografia)..."
            className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setCaseData(prev => ({
              ...prev,
              clinicalData: {
                ...prev.clinicalData,
                imaging: e.target.value
              }
            }))}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          Analisar Caso
        </Button>
      </form>

      {analysis && (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Análise Clínica</h3>
          
          <div className="prose max-w-none">
            <h4 className="text-md font-medium text-gray-700">Raciocínio Clínico</h4>
            <p className="text-gray-600">{analysis.reasoning}</p>

            <h4 className="text-md font-medium text-gray-700 mt-4">Diagnósticos Diferenciais</h4>
            <ul className="list-disc list-inside">
              {analysis.differentialDiagnosis.map((dx, index) => (
                <li key={index} className="text-gray-600">{dx}</li>
              ))}
            </ul>

            <h4 className="text-md font-medium text-gray-700 mt-4">Exames Recomendados</h4>
            <ul className="list-disc list-inside">
              {analysis.recommendedTests.map((test, index) => (
                <li key={index} className="text-gray-600">{test}</li>
              ))}
            </ul>

            <h4 className="text-md font-medium text-gray-700 mt-4">Conduta</h4>
            <p className="text-gray-600">{analysis.treatment}</p>

            <h4 className="text-md font-medium text-gray-700 mt-4">Seguimento</h4>
            <p className="text-gray-600">{analysis.followUp}</p>
          </div>
        </div>
      )}
    </div>
  );
}