import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      {/* Above the fold: identity + gateway */}
      <Hero />
      <About />
      <Menu />

      {/* Below: full sections navigated to via Menu anchors */}
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
