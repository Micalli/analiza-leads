import { useQuery } from "@tanstack/react-query";
import { leadsService } from '../services/leads';

export function useAnalysis() {
  const { data, isFetching } = useQuery({
    queryKey: ["analysis"],
    queryFn: leadsService.getAnalysis,
  });

  return { analysisHistory: data ?? [], isLoading: isFetching };
}
