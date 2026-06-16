import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ForWho from "@/components/ForWho";
import Topics from "@/components/Topics";
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
      <ForWho />
      <Topics />
      <HowItWorks />
      <Stats />
      <BlogPreview />
      <Newsletter />
      <Footer />
    </main>
  );
}
