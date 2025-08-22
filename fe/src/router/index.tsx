import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { toastOptions } from "../app/config/api";
import HistoryList from "../view/pages/HistoryList";
import UploadFile from "../view/pages/UploadFile";
import { AnalyseDetais } from "../view/pages/AnalyseDetails";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

export function Router() {
  return (
    <BrowserRouter>
        <Toaster toastOptions={toastOptions} />
        <Header />
        <Routes>
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/historico" element={<HistoryList />} />
          <Route path="/analise/:analyseId" element={<AnalyseDetais />} />
          <Route path="/" element={<Navigate to="/upload" replace />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;
