import React from 'react';
import { BookOpen, FileText, Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TeachingModeProps {
  specialty: string;
  content: {
    pathophysiology: string;
    mechanismOfAction: string;
    clinicalPearls: string[];
    references: string[];
  };
}

export const TeachingMode: React.FC<TeachingModeProps> = ({
  specialty,
  content
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-gray-900">Modo Ensino</h2>
      </div>

      <div className="prose max-w-none space-y-6">
        <section>
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <FileText className="w-5 h-5" />
            <span>Fisiopatologia</span>
          </h3>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            {content.pathophysiology}
          </div>
        </section>

        <section>
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <FileText className="w-5 h-5" />
            <span>Mecanismo de Ação</span>
          </h3>
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            {content.mechanismOfAction}
          </div>
        </section>

        <section>
          <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <Lightbulb className="w-5 h-5" />
            <span>Pearls Clínicas</span>
          </h3>
          <ul className="mt-2 space-y-2">
            {content.clinicalPearls.map((pearl, index) => (
              <li
                key={index}
                className="p-3 bg-blue-50 rounded-lg text-blue-900 flex items-start space-x-2"
              >
                <span className="mt-1">•</span>
                <span>{pearl}</span>
              </li>
            ))}
          </ul>
        </section>

        {content.references.length > 0 && (
          <section className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Referências</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              {content.references.map((ref, index) => (
                <li key={index}>{ref}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};