import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Features from "../components/sections/Features";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contant";

import ResumeUpload from "../components/resume/ResumeUpload";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Features />
        <ResumeUpload />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}