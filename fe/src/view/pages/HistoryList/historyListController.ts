import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../../../app/hooks/useAnalysis";
import type { AnalysisItem } from "../../../types";

export function historyListController() {
  const navigate = useNavigate();
  const handleViewDetails = (item: AnalysisItem) => {
    navigate(`/analise/${item.id}`);
  };
  const { analysisHistory, isLoading } = useAnalysis();
  return {
    analysisHistory,
    isLoading,
    handleViewDetails,
  };
}
