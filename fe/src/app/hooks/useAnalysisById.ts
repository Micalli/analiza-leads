import { useQuery } from "@tanstack/react-query";
import { leadsService } from '../services/leads';

export function useAnalysisById(analyseId: string| undefined) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["analyse", analyseId],
    queryFn: () => leadsService.getAnalysesById(analyseId),
    enabled: !!analyseId,
  });

  return { analyse: data, isLoading: isFetching, error };
} 
