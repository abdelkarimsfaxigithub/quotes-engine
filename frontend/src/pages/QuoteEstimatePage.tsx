import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";
import { fetchQuoteById, getDoc } from "../services/quoteService";

export default function QuoteEstimatePage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quote", id],
    queryFn: () => fetchQuoteById(id!),
  });

  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center px-4"
      style={{ backgroundImage: "url(/works.jpg)" }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>

      <div className="relative z-10 bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full text-center border border-blue-200">
        {isLoading ? (
          <p className="text-blue-700 font-semibold">Chargement...</p>
        ) : isError || !data ? (
          <p className="text-red-600 font-semibold">
            Erreur lors du chargement de l’estimation.
          </p>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-[#00008B] mb-4">
              Estimation générée
            </h1>
            <p className="text-gray-700 mb-6">
              Voici votre proposition tarifaire pour le devis{" "}
              <strong>{data.opportunity_number}</strong> ({data.guarantee_type}
              ).
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
              <a
                href={getDoc(data.id, 'pdf')}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition"
              >
                <FontAwesomeIcon icon={faFilePdf} className="text-xl" />
                Télécharger PDF
              </a>

              <a
                href={getDoc(data.id, 'word')}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full transition"
              >
                <FontAwesomeIcon icon={faFileWord} className="text-xl" />
                Télécharger Word
              </a>
            </div>

            <p className="text-sm text-gray-600">
              Merci pour votre confiance. Vous pouvez revenir à l’accueil ou
              créer un autre devis.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
