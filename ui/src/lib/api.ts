import { browser } from "$app/environment";
import type { Review, Toilet } from "$lib/types";
import { QueryClient, keepPreviousData } from "@tanstack/svelte-query";
import axios, { type AxiosResponse } from "axios";

const baseURL = "/api";

const axi = axios.create({ baseURL });

// prettier-ignore
export const api = {
  health: (): Promise<AxiosResponse<{ status: string }>> => axi.get("/health"),
  toilets: {
    list: (): Promise<AxiosResponse<Toilet[]>> => axi.get("/toilets"),
    reviews: (id: string): Promise<AxiosResponse<Review[]>> => axi.get(`/toilets/${id}/reviews`),
  },
  reviews: {
    list: (): Promise<AxiosResponse<Review[]>> => axi.get("/reviews"),
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: browser,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 3,
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 10, // 10 mins
    },
    mutations: {
      retry: false,
    },
  },
});