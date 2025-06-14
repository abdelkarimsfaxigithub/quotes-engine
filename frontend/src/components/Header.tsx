import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  return (
    <header className="bg-white shadow fixed w-full z-50 border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/">
          <img src="/logo.png" alt="Logo AXA" className="h-12" />
        </a>
        <nav className="flex gap-4">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-all rounded-full hover:bg-[#00008B] hover:text-white"
          >
            <FontAwesomeIcon icon={faShieldAlt} />
            Assurances
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-all rounded-full hover:bg-[#00008B] hover:text-white"
          >
            <FontAwesomeIcon icon={faUser} />
            Espace Client
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-all rounded-full hover:bg-[#00008B] hover:text-white"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
