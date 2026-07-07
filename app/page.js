import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Home() {
  const cards = [
    { title: "Card 1", description: "This is the first card." },
    { title: "Card 2", description: "This is the second card." }
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="card-grid">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
