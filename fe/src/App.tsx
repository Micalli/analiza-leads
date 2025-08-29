import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router";
import { PageProvider } from "./view/context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 2_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <Router />
      </PageProvider>
    </QueryClientProvider>
  );
}

export default App;
