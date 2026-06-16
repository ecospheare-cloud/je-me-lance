import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ForWho from "@/components/ForWho";
import Topics from "@/components/Topics";
import Guides from "@/components/Guides";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import BlogPreview from "@/components/BlogPreview";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Intro />
      <ForWho />
      <Topics />
      <Guides />
      <HowItWorks />
      <Stats />
      <BlogPreview />
      <Newsletter />
      <Footer />
    </main>
  );
}
