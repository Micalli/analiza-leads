type LeadSimpleAnalysis = {
  name: string;
  score: string;
  title: string;
};

type LeadAnalysis = {
  id: string;
  fileName: string;
  analyzedAt: string; 
  analysis: LeadSimpleAnalysis[] | string;
};
export const leadStore = new Map<string, LeadAnalysis>();
