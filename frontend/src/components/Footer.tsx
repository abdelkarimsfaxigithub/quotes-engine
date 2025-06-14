import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faXTwitter,
  faYoutube,
  faLinkedin,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
      <footer className="bg-[#00008B] text-white text-sm w-full pt-10">
        <div className="max-w-7xl mx-auto px-6">
  
          {/* Première ligne : À PROPOS D'AXA & NOS AUTRES PRODUITS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/20 pb-8">
            {/* Colonne 1 */}
            <div>
              <h4 className="text-lg font-black mb-6 uppercase">À PROPOS D'AXA</h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                <span>Site de recrutement AXA</span>
                <span>L'accessibilité chez AXA : partiellement conforme</span>
                <span>Politique Cookies AXA</span>
                <span>Informations financières et investisseurs</span>
                <span>Nous connaître</span>
                <span>Mentions légales</span>
                <span>Services et assistance AXA</span>
                <span>Documents d'information sur le produit d'assurance</span>
                <span>Sécurité et données personnelles</span>
                <span>Faire une réclamation</span>
                <span>Plan du site</span>
                <span>Résilier un contrat</span>
              </div>
            </div>
  
            {/* Colonne 2 */}
            <div>
              <h4 className="text-lg font-black mb-6 uppercase">NOS AUTRES PRODUITS</h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                <span>Télésurveillance</span>
                <span>Prêt à taux fixe</span>
                <span>Crédit immobilier</span>
                <span>Prêt épargne logement</span>
                <span>Crédit relais</span>
                <span>Compte épargne logement</span>
                <span>Actif sans complémentaire santé</span>
                <span>Devis auto</span>
                <span>Complémentaire santé fonctionnaire</span>
                <span>Devis assurance habitation</span>
                <span>Assurance retraite</span>
                <span>Bourse et Épargne Financière</span>
              </div>
            </div>
          </div>
  
          {/* Deuxième ligne : SITES AXA + navigation */}
          <div className="w-full flex flex-col md:flex-row justify-center items-center text-xs py-6 border-b border-white/20 gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <span>SITES AXA</span>
              <span className="font-normal text-white/80">| Particuliers | Professionnels & Entreprises</span>
            </div>
          </div>
  
          {/* Troisième ligne : Réseaux + © */}
          <div className="flex flex-col md:flex-row justify-between items-center py-6 text-xs">
            <div className="flex items-center gap-4">
              <span className="font-semibold">SUIVRE AXA</span>
              {/* Icônes fictives pour maintenant */}
              <div className="flex gap-4 text-lg">
              <ul className="flex justify-center gap-4 text-white">
      <li>
        <a
          href="https://www.facebook.com/axafrance/?locale=fr_FR"
          title="Facebook"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} className="text-white text-xl hover:text-gray-300" />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/?lang=fr"
          title="Twitter"
          aria-label="Twitter"
        >
          <FontAwesomeIcon icon={faXTwitter} className="text-white text-xl hover:text-gray-300" />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/channel/UCwfRb4aKgVEbN9OCP8JQFzA"
          title="YouTube"
          aria-label="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} className="text-white text-xl hover:text-gray-300" />
        </a>
      </li>
      <li>
        <a
          href="https://fr.linkedin.com/company/axa"
          title="Linkedin"
          aria-label="Linkedin"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-white text-xl hover:text-gray-300" />
        </a>
      </li>
      <li>
        <a
          href="https://www.tiktok.com/@axafrance?lang=fr"
          title="TikTok"
          aria-label="TikTok"
        >
          <FontAwesomeIcon icon={faTiktok} className="text-white text-xl hover:text-gray-300" />
        </a>
      </li>
    </ul>
              </div>
            </div>
            <div className="mt-4 md:mt-0">@2025 AXA Tous droits réservés</div>
          </div>
  
        </div>
      </footer>
    );
  };
  
  export default Footer;
  