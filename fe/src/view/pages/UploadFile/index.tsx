import { Button } from "../../../components/ui/Button";
import { uploadFileController } from "./uploadFileController";

const UploadFile = () => {
  const {
    isLoading,
    handleSubmit,
    handleFileChange,
    selectedFile,
    analyzeName,
    onChangeAnalyzeName,
  } = uploadFileController();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-header rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Upload de Arquivo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Selecione o arquivo
              </label>
              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileChange}
                className="cursor-pointer w-full px-3 py-2 bg-background border border-gray-600 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-black hover:file:bg-primary/90 transition-colors"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-300">
                  Arquivo selecionado: {selectedFile.name}
                </p>
              )}
              {selectedFile && !isLoading && (
                <>
                  <div className="text-gray-400 text-sm mt-6 mb-1">
                    <input
                      value={analyzeName}
                      onChange={onChangeAnalyzeName}
                      placeholder="Nome da Análise"
                      className=" w-full px-3 py-2 bg-background border border-gray-600 rounded-md text-white text-sm font-medium 
                    focus:outline-none focus:ring-2 focus:ring-primary transition-colors
                    hover:border-gray-400"
                    />
                  </div>
                  <span className="text-xs ml-4 font-normal text-gray-400">
                    OBS: Se deixado em branco, o nome do arquivo será
                    utilizado.
                  </span>
                </>
              )}
            </div>

            <Button
              type="submit"
              disabled={!selectedFile || isLoading}
              isLoading={isLoading}
            >
              Enviar Arquivo
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
