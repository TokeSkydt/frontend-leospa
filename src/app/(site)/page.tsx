import About from "@/components/About";
import Hero from "@/components/Hero";
import Image from "next/image";
import Treatments from "@/components/Treatments";
import Recommendation from "@/components/Recommendation";
import Team from "@/components/Team";
import Appointment from "@/components/Appointment";

export default function Home() {
  return (
    <div className="max-w-[1600px] m-auto ">

      <Hero />
      <About />
      <Treatments />
      <Recommendation />
      <Team />
      <Appointment />

    </div>
  );
}
