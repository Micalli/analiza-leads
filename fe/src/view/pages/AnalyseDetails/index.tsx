import { LeadBadge } from "../../../components/LeadBadge";
import { useAnalyseDetailsController } from "./useAnalyseDetailsController";
import { Spinner } from "../../../components/ui/Spinner";
import { formatDate } from "../../../utils/formatDate";
import { Button } from "../../../components/ui/Button";

interface LeadClassification {
  name: string;
  classification: "Hot Lead" | "Warm Lead" | "Cold Lead";
}

export function AnalyseDetais() {
  const { data, isLoading, handleBackToHistory } =
    useAnalyseDetailsController();

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {data && data.analysis.length > 0 && !isLoading && (
          <>
            {/* Header da página */}

            <div className=" my-8">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handleBackToHistory}
                  className=" cursor-pointer flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="mr-2">←</span>
                  Voltar ao Histórico
                </button>
                <div className="text-right">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Detalhes da Análise
                  </h1>
                  <p className="text-gray-300">
                    {data.fileName} • {formatDate(data.analyzedAt)}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-header rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-white">
                  {
                    data?.analysis.filter(
                      (lead: LeadClassification) =>
                        lead.classification === "Hot Lead"
                    ).length
                  }
                </div>
                <div className="text-gray-300">Hot Leads</div>
              </div>

              <div className="bg-header rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-white">
                  {
                    data?.analysis.filter(
                      (lead: LeadClassification) =>
                        lead.classification === "Warm Lead"
                    ).length
                  }
                </div>
                <div className="text-gray-300">Warm Leads</div>
              </div>

              <div className="bg-header rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">❄️</div>
                <div className="text-2xl font-bold text-white">
                  {
                    data?.analysis.filter(
                      (lead: LeadClassification) =>
                        lead.classification === "Cold Lead"
                    ).length
                  }
                </div>
                <div className="text-gray-300">Cold Leads</div>
              </div>
            </div>

            {/* Lista de leads */}
            <div className="bg-header rounded-lg shadow-lg overflow-hidden ">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-white">
                  Classificação dos Leads
                </h2>
                <p className="text-gray-300 text-sm">
                  Resultado da análise automática realizada pelo sistema
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Classificação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {data?.analysis.map(
                      (lead: LeadClassification, index: number) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-700 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">
                              {lead.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <LeadBadge classification={lead.classification} />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ações */}
            <div className="mt-8 flex  justify-center mb-4">
              <Button
                onClick={handleBackToHistory}
                variant="ghost"
                className="w-[200px]"
              >
                Voltar ao Histórico
              </Button>
            </div>
          </>
        )}

        {isLoading && (
          <div className="flex justify-center h-96 items-center  ">
            <Spinner classname="w-10 h-10" />
          </div>
        )}
      </div>
    </div>
  );
}
