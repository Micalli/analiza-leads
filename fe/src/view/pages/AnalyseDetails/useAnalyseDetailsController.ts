import { useNavigate, useParams } from "react-router-dom";
import { useAnalysisById } from "../../../app/hooks/useAnalysisById";
import { useState } from "react";

export function useAnalyseDetailsController() {
  const { analyseId } = useParams();
  const [filterTypeLead, setFilterTypeLead] = useState<string>("");
  const { analyse, isLoading } = useAnalysisById(analyseId);
  const navigate = useNavigate();

  const handleBackToHistory = () => {
    navigate("/historico");
  };
  const handleChangeFilterTypeLead = (typeLead: string) => {

    setFilterTypeLead(typeLead);
  };
  return {
    data: analyse,
    isLoading,
    handleBackToHistory,
    filterTypeLead,
    handleChangeFilterTypeLead,
  };
}
