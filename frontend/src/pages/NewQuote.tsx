import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuote } from "../services/quoteService";
import type { CreateQuote } from "../types/quotes";

export default function CreateQuote() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateQuote>({
    client_name: "",
    guarantee_type: "DO",
    destination: "housing",
    work_type: "new_build",
    has_existing_building: false,
    is_vip_client: false,
    wants_rcmo: false,
    construction_cost: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await createQuote(formData);
      navigate(`/devis/${response.id}`);
    } catch (err: unknown) {
      let errorMessage = "Erreur lors de la création du devis.";
      if (err instanceof Error) {
        errorMessage += ` ${err.message}`;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url(/works.jpg)" }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full"
      >
        <h2 className="text-3xl font-bold text-[#00008B] mb-6 text-center">
          Créer un devis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            placeholder="Nom du client"
            required
            className="p-3 border border-blue-300 rounded-lg"
          />

          <input
            type="number"
            name="construction_cost"
            value={formData.construction_cost}
            onChange={handleChange}
            placeholder="Coût de construction (€)"
            required
            className="p-3 border border-blue-300 rounded-lg"
          />

          <select
            name="guarantee_type"
            value={formData.guarantee_type}
            onChange={handleChange}
            className="p-3 border border-blue-300 rounded-lg"
          >
            <option value="DO">DO</option>
            <option value="TRC">TRC</option>
            <option value="DUO">DO + TRC</option>
          </select>

          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="p-3 border border-blue-300 rounded-lg"
          >
            <option value="housing">Habitation</option>
            <option value="non_housing">Hors habitation</option>
          </select>

          <select
            name="work_type"
            value={formData.work_type}
            onChange={handleChange}
            className="p-3 border border-blue-300 rounded-lg"
          >
            <option value="new_build">Ouvrage neuf</option>
            <option value="light_reno">Rénovation légère</option>
            <option value="heavy_reno">Rénovation lourde</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="has_existing_building"
              checked={formData.has_existing_building}
              onChange={handleChange}
            />
            Bâtiment existant
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_vip_client"
              checked={formData.is_vip_client}
              onChange={handleChange}
            />
            Client VIP
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="wants_rcmo"
              checked={formData.wants_rcmo}
              onChange={handleChange}
            />
            Souhaite RCMO
          </label>
        </div>

        {error && (
          <p className="text-red-600 font-medium text-sm mt-4 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full"
        >
          {isSubmitting ? "Création en cours..." : "Créer le devis"}
        </button>
      </form>
    </section>
  );
}
