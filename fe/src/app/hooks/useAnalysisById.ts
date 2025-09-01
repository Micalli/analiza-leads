import { useQuery } from "@tanstack/react-query";
import { leadsService } from '../services/leads';

export function useAnalysisById(analyseId: string| undefined) {
  const { data, isFetching,  isError } = useQuery({
    queryKey: ["analyse", analyseId],
    queryFn: () => leadsService.getAnalysesById(analyseId),
    enabled: !!analyseId,
  });

  return { analyse: data, isLoading: isFetching, isError };
} 
