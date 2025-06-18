import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// 1 – create the client once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cache for 1 minute, retry failed once, etc.
      staleTime: 60_000,
      retry: 1,
    },
    mutations: {
      // global mutation error handler
      onError: (err) => console.error(err),
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2 – wrap the app */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
