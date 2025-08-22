export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
};

export const toastOptions = {
  style: {
    background: "#1F1F1F",
    color: "#fff",
  },
  success: {
    iconTheme: {
      primary: "#00DBD5",
      secondary: "#1F1F1F",
    },
  },
  error: {
    iconTheme: {
      primary: "#ff4b4b",
      secondary: "#1F1F1F",
    },
  },
};
