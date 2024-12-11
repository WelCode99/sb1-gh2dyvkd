import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { specialties } from '../data/specialties';
import { ChatMessage } from '../components/ChatMessage';
import { Sidebar } from '../components/specialty/Sidebar';
import { ProtocolViewer } from '../components/specialty/ProtocolViewer';
import { TreatmentTable } from '../components/specialty/TreatmentTable';
import { ClinicalCaseAnalyzer } from '../components/specialty/ClinicalCaseAnalyzer';
import { TeachingMode } from '../components/specialty/TeachingMode';
import { generateChatResponse } from '../lib/services/chat-service';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Chat() {
  const { specialtyId } = useParams<{ specialtyId: string }>();
  const specialty = specialties.find((s) => s.id === specialtyId);
  const [activeTab, setActiveTab] = useState('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!specialty) {
    return <Navigate to="/" replace />;
  }

  const renderToolContent = () => {
    switch (activeTab) {
      case 'protocols':
        return <ProtocolViewer protocol={{ id: '1', title: 'Protocolo Exemplo', type: 'guideline', content: 'Conteúdo do protocolo...', specialty: specialtyId!, lastUpdated: new Date(), evidenceLevel: 'A', references: [] }} />;
      case 'treatments':
        return <TreatmentTable comparison={{ id: '1', specialty: specialtyId!, category: 'Exemplo', medications: [] }} />;
      case 'cases':
        return <ClinicalCaseAnalyzer specialty={specialtyId!} />;
      case 'teaching':
        return (
          <TeachingMode
            specialty={specialtyId!}
            content={{
              pathophysiology: 'Conteúdo detalhado sobre fisiopatologia...',
              mechanismOfAction: 'Explicação sobre mecanismos de ação...',
              clinicalPearls: [
                'Pearl 1: Importante considerar...',
                'Pearl 2: Sempre verificar...',
                'Pearl 3: Não esquecer de...'
              ],
              references: [
                'Harrison\'s Principles of Internal Medicine, 20th Edition',
                'UpToDate - Relevant Topic Review, 2023'
              ]
            }}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab !== 'chat') setActiveTab('chat');
    
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await generateChatResponse(userMessage, specialty.id);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Desculpe, não foi possível processar sua solicitação no momento.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow-sm overflow-hidden">
      {isSidebarOpen && (
        <Sidebar
          specialtyId={specialtyId!}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isSidebarOpen ? 'Fechar sidebar' : 'Abrir sidebar'}
            >
              {isSidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
            <h2 className="text-xl font-semibold text-gray-900">{specialty.name}</h2>
          </div>
        </div>
        {activeTab === 'chat' ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    content={message.content}
                    isBot={message.isBot}
                    timestamp={message.timestamp}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t">
              <form className="flex space-x-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()} isLoading={isLoading}>
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 p-4 overflow-y-auto">{renderToolContent()}</div>
        )}
      </div>
    </div>
  );
}