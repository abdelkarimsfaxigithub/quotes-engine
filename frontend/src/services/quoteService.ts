import axios from "axios";

import type {
  Filters,
  QuoteResponse,
  CreateQuote,
  Quote,
} from "../types/quotes";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchQuotes = async (
  filters: Filters,
  page: number
): Promise<QuoteResponse> => {
  const params = new URLSearchParams(
    Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {} as Record<string, string>)
  );
  params.append("page", page.toString());
  // TODO: Move base URL to environment variables for better configuration
  const response = await axios.get(`${API_URL}/quotes/`, {
    params,
  });

  return response.data;
};

// TODO: Move base URL to environment variables for better configuration
export const deleteQuote = async (id: number): Promise<void> => {
  const response = await axios.delete(`${API_URL}/quotes/${id}/`);
  return response.data;
};

export async function createQuote(data: CreateQuote): Promise<Quote> {
  // TODO: Move base URL to environment variables for better configuration
  const response = await axios.post(`${API_URL}/quotes/`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function fetchQuoteById(id: string): Promise<Quote> {
  const response = await axios.get(`${API_URL}/quotes/${id}/`);
  return response.data;
}

export const getDoc = (id: number, type: string) =>
  `${API_URL}/quotes/${id}/document/${type}/`;
