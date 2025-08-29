import { createContext, useCallback, useState } from "react";
interface PageContextValue {
  isSuggestedMessageModalOpen: boolean;
  suggestedMessage: string;

  closeSuggestedMessageModal(): void;
  openSuggestedMessageModal(suggestedMessage: string): void;
}

export const PageContext = createContext({} as PageContextValue);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [isSuggestedMessageModalOpen, setIsSuggestedMessageModalOpen] =
    useState(false);
     const [suggestedMessage, setSuggestedMessage] =
       useState("");

  const openSuggestedMessageModal = useCallback((suggestedMessage:string) => {
    setSuggestedMessage(suggestedMessage);
    setIsSuggestedMessageModalOpen(true);
  }, []);

  const closeSuggestedMessageModal = useCallback(() => {
    setSuggestedMessage("");
    setIsSuggestedMessageModalOpen(false);
  }, []);

  return (
    <PageContext.Provider
      value={{
        isSuggestedMessageModalOpen,
        suggestedMessage,
        openSuggestedMessageModal,
        closeSuggestedMessageModal,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
