import { useNavigate, useParams } from "react-router-dom";
import { useAnalysisById } from "../../../app/hooks/useAnalysisById";

export function useAnalyseDetailsController() {
  const { analyseId } = useParams();
  const { analyse, isLoading } = useAnalysisById(analyseId);
 const navigate = useNavigate();

 const handleBackToHistory = () => {
   navigate("/historico");
 };

  return {
    data: analyse,
    isLoading,
    handleBackToHistory,
  };
}
