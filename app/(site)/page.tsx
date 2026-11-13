import About from "@/components/home/About";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Reservation from "@/components/home/Reservation";
import Services from "@/components/home/Services";
import Testimonial from "@/components/home/Testimonial";
import SpecialDish from "@/components/home/SpecialDish";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <SpecialDish />
      <FeaturedMenu />
      <Features />
      <Testimonial />
      <Reservation />
    </>
  );
}
