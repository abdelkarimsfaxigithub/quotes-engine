import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { QuoteResponse, Filters } from "../types/quotes";
import Hero from "../components/Hero";
import { fetchQuotes, deleteQuote, getDoc } from "../services/quoteService";

export default function QuotesPage() {
  const [filters, setFilters] = useState<Filters>({
    guarantee_type: "",
    destination: "",
    work_type: "",
    client_name: "",
    cost_range: "",
  });

  // Local state pour debounce client_name
  const [localFilters, setLocalFilters] = useState(filters);
  const [page, setPage] = useState(1);
  // Debounce client_name uniquement
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(localFilters);
      setPage(1);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [localFilters]);

  const { data, isLoading, isError } = useQuery<QuoteResponse, Error>({
    queryKey: ["quotes", filters, page],
    queryFn: () => fetchQuotes(filters, page),
    staleTime: 30000,
  });

  const isPaginationDisabled = (data?.count ?? 0) <= 10;

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: (id: number) => deleteQuote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });

  return (
    <>
      <Hero />
      <div className="w-full flex flex-col space-y-4 items-center justify-center py-6">
        <h1 className="text-2xl font-bold mb-4 text-[#00008B] text-center">
          Liste des devis
        </h1>

        {/* Filtres */}
        <div className="rounded-2xl shadow-xl border border-blue-200 max-w-7xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-blue-50 border-b border-blue-200">
            <select
              name="guarantee_type"
              onChange={handleFilterChange}
              value={localFilters.guarantee_type}
              className="p-2 border border-blue-300 rounded-full bg-white text-blue-900"
            >
              <option value="">Type de garantie</option>
              <option value="DO">DO seule</option>
              <option value="TRC">TRC seule</option>
              <option value="DUO">DO + TRC</option>
            </select>

            <select
              name="destination"
              onChange={handleFilterChange}
              value={localFilters.destination}
              className="p-2 border border-blue-300 rounded-full bg-white text-blue-900"
            >
              <option value="">Destination</option>
              <option value="housing">Habitation</option>
              <option value="non_housing">Hors habitation</option>
            </select>

            <select
              name="work_type"
              onChange={handleFilterChange}
              value={localFilters.work_type}
              className="p-2 border border-blue-300 rounded-full bg-white text-blue-900"
            >
              <option value="">Type de travaux</option>
              <option value="light_reno">Rénovation légère</option>
              <option value="heavy_reno">Rénovation lourde</option>
              <option value="new_build">Ouvrage neuf</option>
            </select>

            <input
              type="text"
              name="client_name"
              placeholder="Nom du client"
              value={localFilters.client_name}
              onChange={handleFilterChange}
              className="p-2 border border-blue-300 rounded-full bg-white text-blue-900"
            />

            <select
              name="cost_range"
              onChange={handleFilterChange}
              value={localFilters.cost_range}
              className="p-2 border border-blue-300 rounded-full bg-white text-blue-900"
            >
              <option value="">Coût construction</option>
              <option value="<100000">{`< 100 000 €`}</option>
              <option value="100000-500000">{`100 000 - 500 000 €`}</option>
              <option value="500000-1000000">{`500 000 - 1 000 000 €`}</option>
              <option value=">1000000"> {`> 1 000 000 €`}</option>
            </select>
          </div>

          {/* table */}
          {isLoading ? (
            <p className="p-4 text-blue-700 font-medium">Chargement...</p>
          ) : isError ? (
            <p className="p-4 text-red-600 font-medium">
              Erreur lors du chargement des données.
            </p>
          ) : (
            <div className="overflow-x-auto">
              {(data as QuoteResponse)?.results.length === 0 ? (
                <p className="p-4 text-gray-600 italic">Aucun devis trouvé.</p>
              ) : (
                <table className="w-full table-auto text-sm text-left">
                  <thead className="bg-blue-100 text-blue-800">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Garantie</th>
                      <th className="p-3">Travaux</th>
                      <th className="p-3">Montant</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {(data as QuoteResponse)?.results.map((quote) => (
                      <tr
                        key={quote.id}
                        className="hover:bg-blue-50 transition"
                      >
                        <td className="p-3">{quote.opportunity_number}</td>
                        <td className="p-3">{quote.client_name}</td>
                        <td className="p-3">
                          {new Date(quote.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">{quote.guarantee_type}</td>
                        <td className="p-3">{quote.work_type}</td>
                        <td className="p-3">
                          {parseFloat(quote.construction_cost).toLocaleString()}{" "}
                          €
                        </td>
                        <td className="p-3 flex justify-center gap-3">
                          <a
                            target="_blank"
                            href={getDoc(quote.id, "pdf")}
                            title="Télécharger PDF"
                          >
                            <img src="/pdf.png" className="h-6 w-auto" />
                          </a>
                          <a
                            target="_blank"
                            href={getDoc(quote.id, "word")}
                            title="Télécharger Word"
                          >
                            <img src="/word.png" className="h-6 w-auto" />
                          </a>
                          <button
                            onClick={() => {
                              if (confirm("Supprimer ce devis ?")) {
                                handleDelete(quote.id);
                              }
                            }}
                            title="Supprimer"
                            className="text-red-600"
                          >
                            <img src="/delete.png" className="h-6 w-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="flex justify-center items-center gap-4 py-4">
                <button
                  className="px-4 py-2 rounded-full border border-blue-300 text-blue-800 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={isPaginationDisabled || !data?.previous}
                >
                  ◀ Précédente
                </button>
                <span className="text-blue-800 font-medium">Page {page}</span>
                <button
                  className="px-4 py-2 rounded-full border border-blue-300 text-blue-800 disabled:opacity-50"
                  onClick={() => {
                    if (data?.next) setPage((p) => p + 1);
                  }}
                  disabled={isPaginationDisabled || !data?.next}
                >
                  Suivante ▶
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
