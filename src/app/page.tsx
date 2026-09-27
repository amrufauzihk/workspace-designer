import { About } from "@/components/home/About";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WorkspaceConfigurator } from "@/components/workspace/WorkspaceConfigurator";

export default function Home() {
  return (
    <>
      <a
        href="#studio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to Workspace Studio
      </a>
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WorkspaceConfigurator />
        <About />
      </main>
      <Footer />
    </>
  );
}
