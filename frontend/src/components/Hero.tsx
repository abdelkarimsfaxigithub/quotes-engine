import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
    const navigate = useNavigate();
  return (
    <section className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: 'url(/works.jpg)', // Remplace avec le chemin réel
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-70"></div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-[#00008B] mb-2">
          Assurance Habitation
        </h1>
        <p className="text-[#00008B] font-medium text-lg md:text-xl mb-10">
          La douceur de votre foyer, c'est vous. La sérénité, c'est nous.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Bloc 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold mb-2">Votre tarif en 5 minutes</h2>
            <p className="text-gray-700 mb-6 min-h-[80px]">
            Répondez à quelques questions pour obtenir un tarif personnalisé pour votre chantier : construction, rénovation ou travaux spécifiques.
            </p>
            <FontAwesomeIcon icon={faClipboardList} className="text-[#00008B] text-5xl mb-6" />
            <button onClick={()=> navigate(`/devis`)} className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2">
              Obtenir un tarif
              <span className="ml-2">→</span>
            </button>
          </div>

          {/* Bloc 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold mb-2">Besoin d’un conseil ?</h2>
            <p className="text-gray-700 mb-6 min-h-[80px]">
              Un de nos conseillers vous contactera afin de définir l'assurance habitation la plus adaptée à votre besoin
            </p>
            <FontAwesomeIcon icon={faPhone} className="text-[#00008B] text-5xl mb-6" />
            <button className="border-2 border-[#00008B] text-[#00008B] hover:bg-[#00008B] hover:text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors duration-300">
              Être recontacté
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
