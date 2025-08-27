import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { leadsService } from "../../../app/services/leads";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function uploadFileController() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzeName, setAnalyzeName] = useState<string>("");

  const { mutateAsync: uploadFile, isPending } = useMutation({
    mutationFn: async ({ file, analyzeNameFile }: { file: File; analyzeNameFile?: string }) => {
      return leadsService.uploadFile(file, analyzeNameFile);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];

      if (
        allowedTypes.includes(file.type) ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".csv")
      ) {
        setSelectedFile(file);
      } else {
        alert("Por favor, selecione um arquivo .xls, .xlsx ou .csv");
        event.target.value = "";
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Por favor, selecione um arquivo");
      return;
    }

    try {
      await uploadFile({ file: selectedFile, analyzeNameFile: analyzeName });

      toast.success("Arquivo analisado.");
      navigate("/historico");
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Não foi possivel fazer o upload do arquivo.");
    }
  };

  const onChangeAnalyzeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnalyzeName(event.target.value);
  };

  return {
    isLoading: isPending,
    selectedFile,
    analyzeName,
    handleSubmit,
    handleFileChange,
    onChangeAnalyzeName,
  };
}
