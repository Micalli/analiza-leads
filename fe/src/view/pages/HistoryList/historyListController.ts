import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../../../app/hooks/useAnalysis";
import type { AnalysisItem } from "../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leadsService } from "../../../app/services/leads";
import toast from "react-hot-toast";
import { useCallback, useState } from 'react';

export function historyListController() {
   const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDeleteAnalyzeModalOpen, setIsDeleteAnalyzeOpen] =
    useState(false);

      const [deletedAnalyzeId, setDeleteAnalyzeId] =
        useState<string>("");

  const openDeleteAnalyzeModal = useCallback(() => {
    setIsDeleteAnalyzeOpen(true);
  }, []);

  const closeDeleteAnalyzeModal = useCallback(() => {
    setIsDeleteAnalyzeOpen(false);
  }, []);

  const handleViewDetails = (item: AnalysisItem) => {
    navigate(`/analise/${item.id}`);
  };
  const { mutateAsync: deleteAnalyze } = useMutation({
    mutationFn: async (analyseId: string) => {
      return leadsService.remove(analyseId);
    },
  });

  async function handleDeleteAnalyzeConfirmaton(analyseId: string) {
    openDeleteAnalyzeModal()
    setDeleteAnalyzeId(analyseId)

  }

   async function handleDeleteAnalyze(analyseId: string) {

     try {
       await deleteAnalyze(analyseId);
       toast.success("Análise deletada com sucesso");
       queryClient.invalidateQueries({ queryKey: ["analysis"] });
       closeDeleteAnalyzeModal()
     } catch (error) {
       console.log("🚀 ~ handleDeleteAnalyze ~ error:", error);
       toast.error("Erro ao deletar análise");
     }
   }

  const { analysisHistory, isLoading } = useAnalysis();
  return {
    analysisHistory,
    isLoading,
    isDeleteAnalyzeModalOpen,
    deletedAnalyzeId,
    handleViewDetails,
    handleDeleteAnalyze,
    handleDeleteAnalyzeConfirmaton,
    closeDeleteAnalyzeModal,
    openDeleteAnalyzeModal,
  };
}
