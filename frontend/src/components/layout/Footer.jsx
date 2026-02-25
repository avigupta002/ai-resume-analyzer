export default function Footer() {
  return (
    <footer className="border-t bg-white py-6">
      <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} TalentScan. All rights reserved.
      </div>
    </footer>
  );
}