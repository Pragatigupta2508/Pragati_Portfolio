import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import Creative from "@/components/home/Creative";
import Achievements from "@/components/home/Achievements";
import Contact from "@/components/home/Contact";
import Constellation from "@/components/effects/Constellation";
export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#05010d]">

      {/* Global Background */}
      <Constellation />

      <div className="relative z-10">

        <Hero />



        <About />
        <Projects />
        <Creative />
        <Achievements />
        <Contact />
      </div>
    </main>
  );
}