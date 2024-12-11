import React from 'react';
import { specialties } from '../data/specialties';
import { SpecialtyCard } from '../components/SpecialtyCard';
import { cn } from '../lib/utils';

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Especialidades Médicas</h1>
        <p className="text-lg text-gray-600">
          Selecione uma especialidade para iniciar uma consulta
        </p>
      </div>
      <div className={cn(
        "grid gap-6",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4"
      )}>
        {specialties.map((specialty) => (
          <SpecialtyCard key={specialty.id} specialty={specialty} />
        ))}
      </div>
    </div>
  );
};

export default Home;