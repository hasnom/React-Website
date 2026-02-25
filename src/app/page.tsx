import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Expertise } from "@/components/sections/Expertise";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Experience } from "@/components/sections/Experience";
import { Philosophy } from "@/components/sections/Philosophy";
import { Skills } from "@/components/sections/Skills";
import { Credentials } from "@/components/sections/Credentials";
import { LookingFor } from "@/components/sections/LookingFor";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Impact />
      <Expertise />
      <CaseStudies />
      <Experience />
      <Philosophy />
      <Skills />
      <Credentials />
      <LookingFor />
      <Contact />
      <Footer />
    </main>
  );
}
