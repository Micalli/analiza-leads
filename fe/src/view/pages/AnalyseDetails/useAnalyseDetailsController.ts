import { useNavigate, useParams } from "react-router-dom";
import { useAnalysisById } from "../../../app/hooks/useAnalysisById";
import { useState } from "react";
import { usePage } from "../../context/usePage";
import toast from "react-hot-toast";

export function useAnalyseDetailsController() {
  const { analyseId } = useParams();
  const [filterTypeLead, setFilterTypeLead] = useState<string>("");
  const { analyse, isLoading } = useAnalysisById(analyseId);
  const navigate = useNavigate();
  const {
    closeSuggestedMessageModal,
    isSuggestedMessageModalOpen,
    openSuggestedMessageModal,
    suggestedMessage,
  } = usePage();

  const handleBackToHistory = () => {
    navigate("/historico");
  };
  const handleChangeFilterTypeLead = (typeLead: string) => {
    setFilterTypeLead(typeLead);
  };

  const handleOpenSugestedModal = (suggestedMessage: string) => {
    if (!suggestedMessage) {

      toast("Não há mensagem sugerida para este lead.", {
        icon: "⚠️",
      });
      return;
    }
    openSuggestedMessageModal(suggestedMessage);
  };
  return {
    data: analyse,
    isLoading,
    handleBackToHistory,
    filterTypeLead,
    handleChangeFilterTypeLead,
    closeSuggestedMessageModal,
    isSuggestedMessageModalOpen,
    openSuggestedMessageModal,
    suggestedMessage,
    handleOpenSugestedModal,
  };
}
