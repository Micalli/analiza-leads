import { Button } from "../../../components/ui/Button";
import { HistorySkeleton } from "../../../components/ui/HistorySkeleton";
import type { AnalysisItem } from "../../../types";
import { formatDate } from "../../../utils/formatDate";
import { ConfirmDeleteAnalyze } from '../../modals/ConfirmDeleteAnalyze';
import { historyListController } from "./historyListController";
import { Trash } from "lucide-react";
const HistoryList = () => {
  const {
    analysisHistory,
    isLoading,
    handleViewDetails,
    handleDeleteAnalyze,
    deletedAnalyzeId,
    handleDeleteAnalyzeConfirmaton,
    isDeleteAnalyzeModalOpen,
    closeDeleteAnalyzeModal,
  } = historyListController();

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="my-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Histórico de Análises
          </h2>
          <p className="text-gray-300">
            Visualize todos os arquivos analisados pelo sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisHistory.length > 0 &&
            !isLoading &&
            analysisHistory.map((item: AnalysisItem) => (
              <div
                key={item.id}
                className="bg-header rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold text-white mb-2 truncate">
                        {item.fileName}
                      </h3>
                      <button
                        onClick={() => handleDeleteAnalyzeConfirmaton(item.id)}
                        className="cursor-pointer hover:text-red-700 transition-all"
                      >
                        <Trash />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">📅</span>
                        <span>Análise: {formatDate(item.analyzedAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">💬</span>
                        <span>{item.analysis.length} leads</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={() => handleViewDetails(item)}>
                  Visualizar Detalhes
                </Button>
              </div>
            ))}
          {isLoading && <HistorySkeleton />}
        </div>

        {analysisHistory.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Nenhuma análise encontrada
            </h3>
            <p className="text-gray-500">
              Faça o upload de um arquivo para começar a usar o sistema
            </p>
          </div>
        )}
      </div>
      <ConfirmDeleteAnalyze
        onClose={closeDeleteAnalyzeModal}
        isOpen={isDeleteAnalyzeModalOpen}
        analyzeId={deletedAnalyzeId}
        onConfirm={handleDeleteAnalyze}
      />
    </div>
  );
};

export default HistoryList;
