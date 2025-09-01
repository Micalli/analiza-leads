import { LeadBadge } from "../../../components/LeadBadge";
import { useAnalyseDetailsController } from "./useAnalyseDetailsController";
import { Spinner } from "../../../components/ui/Spinner";
import { formatDate } from "../../../utils/formatDate";
import { Button } from "../../../components/ui/Button";
import { useEffect } from "react";
import { CustomDropdown } from "../../../components/ui/DropdownMenu";
import { SuggestedMessageModal } from "../../modals/SuggestedMessageModal";
import type { LeadClassification } from "../../../types";
import { adjustDateMinus3Hours } from '../../../utils/adjustDateMinus3Hours';

const optionsFilter = [
  {
    value: "",
    label: "Todos",
  },
  {
    value: "cold",
    label: "Cold Lead",
  },
  {
    value: "warm",
    label: "Warm Lead",
  },
  {
    value: "hot",
    label: "Hot Lead",
  },
];

export function AnalyseDetais() {
  const {
    data,
    isLoading,
    handleBackToHistory,
    filterTypeLead,
    handleChangeFilterTypeLead,
    suggestedMessage,
    closeSuggestedMessageModal,
    handleOpenSugestedModal,
    isSuggestedMessageModalOpen,
    isError
  } = useAnalyseDetailsController();
    console.log("🚀 ~ AnalyseDetais ~ isError:", isError)

  const filterBy = data?.analysis.filter((analyse) => {
    if (!filterTypeLead) return true; // se não tiver filtro, retorna todos

    if (filterTypeLead === "cold") {
      return analyse.score >= 0 && analyse.score <= 30;
    }
    if (filterTypeLead === "warm") {
      return analyse.score >= 31 && analyse.score <= 60;
    }
    if (filterTypeLead === "hot") {
      return analyse.score >= 61 && analyse.score <= 100;
    }

    return true;
  });
  useEffect(() => {}, [filterTypeLead]);
  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-8xl">
        {data && data.analysis.length > 0 && filterBy && !isLoading && (
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
                      (lead: LeadClassification) => lead.score >= 61
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
                        lead.score >= 31 && lead.score <= 60
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
                      (lead: LeadClassification) => lead.score <= 30
                    ).length
                  }
                </div>
                <div className="text-gray-300">Cold Leads</div>
              </div>
            </div>

            {/* Lista de leads */}
            <div className="bg-header rounded-lg shadow-lg overflow-hidden ">
              <div className="flex flex-col sm:flex-row justify-between px-6 py-4 border-b border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Classificação dos Leads
                  </h2>
                  <p className="text-gray-300 text-sm">
                    Resultado da análise automática realizada pelo sistema
                  </p>
                </div>
                <div className="sm:mt-0 mt-6">
                  <select
                    value={filterTypeLead}
                    onChange={(e) => handleChangeFilterTypeLead(e.target.value)}
                    className="cursor-pointer w-full px-3 py-2 bg-background border border-gray-600 rounded-md text-white text-sm font-medium 
             focus:outline-none focus:ring-2 focus:ring-primary transition-colors
             hover:border-gray-400"
                  >
                    {optionsFilter.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className=""
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Descrição da conversa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Dono da ultima mensagem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Data da ultima mensagem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Açoes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filterBy.map((lead: LeadClassification, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-700 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            <a
                              href={lead.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {lead.name}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lead.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <LeadBadge score={lead.score} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {lead.lastSender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatDate(
                            adjustDateMinus3Hours(lead.lastMessageDate)
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <button>
                            <CustomDropdown
                              triggerLabel="Options"
                              options={[
                                {
                                  label: "Ver perfil",
                                  onClick: () =>
                                    window.open(lead.linkedinUrl, "_blank"),
                                },
                                {
                                  onClick: () => {
                                    handleOpenSugestedModal(
                                      lead.suggestedMessage
                                    );
                                  },
                                  label: "Ver mensagem sugerida",
                                },
                              ]}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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
        {isError && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Análise encontrada
            </h3>
            <p className="text-gray-500">
              A análise que você está tentando acessar não existe ou ocorreu um erro
            </p>
          </div>
        )}
        <SuggestedMessageModal
          suggestedMessage={suggestedMessage}
          onClose={closeSuggestedMessageModal}
          isOpen={isSuggestedMessageModalOpen}
        />

        {isLoading && (
          <div className="flex justify-center h-96 items-center  ">
            <Spinner classname="w-10 h-10" />
          </div>
        )}
      </div>
    </div>
  );
}
