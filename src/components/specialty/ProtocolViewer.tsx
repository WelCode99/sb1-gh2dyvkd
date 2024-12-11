import React from 'react';
import { Protocol } from '../../types/medical';
import { cn } from '../../lib/utils';
import { BookOpen, Download, Star } from 'lucide-react';

interface ProtocolViewerProps {
  protocol: Protocol;
  onSaveToFavorites?: (protocol: Protocol) => void;
  onDownload?: (protocol: Protocol) => void;
}

export const ProtocolViewer: React.FC<ProtocolViewerProps> = ({
  protocol,
  onSaveToFavorites,
  onDownload,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">{protocol.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {onSaveToFavorites && (
            <button
              onClick={() => onSaveToFavorites(protocol)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Salvar nos favoritos"
            >
              <Star className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {onDownload && (
            <button
              onClick={() => onDownload(protocol)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Download para modo offline"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="mb-4">
          {protocol.content}
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span className={cn(
            "px-2 py-1 rounded-full",
            {
              'bg-green-100 text-green-700': protocol.evidenceLevel === 'A',
              'bg-yellow-100 text-yellow-700': protocol.evidenceLevel === 'B',
              'bg-orange-100 text-orange-700': protocol.evidenceLevel === 'C',
            }
          )}>
            Nível de Evidência: {protocol.evidenceLevel}
          </span>
          <span>•</span>
          <span>Atualizado em: {protocol.lastUpdated.toLocaleDateString()}</span>
        </div>

        {protocol.references.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Referências</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {protocol.references.map((ref, index) => (
                <li key={index}>{ref}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}