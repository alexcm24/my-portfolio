import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ContactFooter from "@/components/ContactFooter";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectList />
        <About />
        <Skills />
      </main>
      <ContactFooter />
    </>
  );
}
