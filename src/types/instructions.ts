export interface InstructionSection {
  title: string;
  description: string;
  guidelines: string[];
}

export interface Instructions {
  sections: Record<string, InstructionSection>;
}