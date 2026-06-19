import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";

export default function Home() {
  return (
    <main className="space-y-10">
      <Hero onContact={() => window.open("https://wa.me/5551984357011", "_blank", "noopener,noreferrer")} />
      <Gallery />
      <Reviews />
    </main>
  );
}
