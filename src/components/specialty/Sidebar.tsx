import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Table, FileText, Star, Settings, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  specialtyId: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'protocols', label: 'Protocolos', icon: BookOpen },
  { id: 'treatments', label: 'Tratamentos', icon: Table },
  { id: 'cases', label: 'Análise de Casos', icon: FileText },
  { id: 'teaching', label: 'Modo Ensino', icon: GraduationCap },
  { id: 'favorites', label: 'Favoritos', icon: Star },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  specialtyId,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Ferramentas</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm",
                    "transition-colors duration-200",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};