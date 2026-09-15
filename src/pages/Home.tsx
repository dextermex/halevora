import SiteChrome from "@/components/SiteChrome";
import ShardDivider from "@/site/motion/ShardDivider";
import Hero from "@/site/home/Hero";
import Premise from "@/site/home/Premise";
import Platforms from "@/site/home/Platforms";
import Plateau from "@/site/home/Plateau";
import Operation from "@/site/home/Operation";
import FilmBand from "@/site/home/FilmBand";
import Levers from "@/site/home/Levers";
import Phases from "@/site/home/Phases";
import CaseStudy from "@/site/home/CaseStudy";
import Impact from "@/site/home/Impact";
import Terms from "@/site/home/Terms";
import Comparison from "@/site/home/Comparison";
import ApplySection from "@/site/home/ApplySection";
import FaqSection from "@/site/home/FaqSection";
import { useReveal, useRouteSeo } from "@/site/hooks";

/** Home, in the order fixed by the brief. Seventeen blocks, under 800 words. */
export default function Home() {
  useRouteSeo("/");
  useReveal();
  return (
    <SiteChrome home>
      <Hero />
      <Premise />
      <Platforms />
      <Plateau />
      <ShardDivider />
      <Operation />
      <FilmBand />
      <Levers />
      <ShardDivider />
      <Phases />
      <CaseStudy />
      <ShardDivider />
      <Impact />
      <Terms />
      <Comparison />
      <ShardDivider />
      <ApplySection />
      <FaqSection />
    </SiteChrome>
  );
}
