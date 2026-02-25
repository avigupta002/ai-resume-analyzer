export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-lg">TALENTSCAN</span>
        <div className="space-x-6 text-sm">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}