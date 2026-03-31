import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";

export default function Home() {
  return (
    <main className="space-y-10">
      <Hero />
      <Gallery />
      <Reviews />
    </main>
  );
}
