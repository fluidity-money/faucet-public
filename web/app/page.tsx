"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import App from "./app";

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}