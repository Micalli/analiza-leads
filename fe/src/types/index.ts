export interface AnalysisItem {
  id: string;
  fileName: string;
  analyzedAt: string;
  analysis: LeadClassification[];
}

export interface LeadClassification {
  name: string;
  classification: "Hot Lead" | "Warm Lead" | "Cold Lead";
}
