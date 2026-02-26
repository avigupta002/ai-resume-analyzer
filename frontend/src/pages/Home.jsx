import { lazy, Suspense } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";

// Lazy load below-the-fold sections
const About = lazy(() => import("../components/sections/About"));
const Features = lazy(() => import("../components/sections/Features"));
const Testimonials = lazy(() => import("../components/sections/Testimonials"));
const Contact = lazy(() => import("../components/sections/Contant"));
const ResumeUpload = lazy(() => import("../components/resume/ResumeUpload"));

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* DO NOT lazy load Hero (LCP element inside it) */}
        <Hero />

        <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
          <About />
          <Features />
          <ResumeUpload />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}