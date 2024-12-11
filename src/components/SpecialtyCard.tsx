import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Microscope,
  Heart,
  Brain,
  Baby,
  Ribbon,
  Beaker,
  Activity,
  Wind,
  Stethoscope,
  Scan,
  Bone
} from 'lucide-react';
import { Specialty } from '../types/specialty';
import { cn } from '../lib/utils';

const iconMap = {
  'microscope': Microscope,
  'heart': Heart,
  'brain': Brain,
  'baby': Baby,
  'ribbon': Ribbon,
  'beaker': Beaker,
  'activity': Activity,
  'wind': Wind,
  'stethoscope': Stethoscope,
  'scan': Scan,
  'bone': Bone
};

function getIconStyles(color: string) {
  return {
    backgroundColor: `${color}15`,
    color: color
  };
}

function getCardStyles(color: string) {
  return {
    borderColor: `${color}30`,
    '--card-color': color
  } as React.CSSProperties;
}

interface SpecialtyCardProps {
  specialty: Specialty;
}

export const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty }) => {
  const Icon = iconMap[specialty.icon as keyof typeof iconMap];

  return (
    <Link
      to={`/chat/${specialty.id}`}
      className="block p-6 bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
      style={getCardStyles(specialty.color)}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full" style={getIconStyles(specialty.color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{specialty.name}</h3>
          <p className="text-sm text-gray-600">{specialty.description}</p>
        </div>
      </div>
    </Link>
  );
};