import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <span className="font-bold text-lg">TALENTSCAN</span>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#resume" className="hover:text-blue-600 transition">Resume</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>

        {/* Mobile Icon Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden transition-transform duration-300"
        >
          {isOpen ? (
            <X size={28} className="transition-all duration-300 rotate-180" />
          ) : (
            <Menu size={28} className="transition-all duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden
        ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col px-4 py-3 space-y-3 text-sm font-medium">
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#resume" onClick={() => setIsOpen(false)}>Resume</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
}