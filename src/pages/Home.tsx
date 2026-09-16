import SiteChrome from "@/components/SiteChrome";
import ShardDivider from "@/site/motion/ShardDivider";
import BirdFlight from "@/site/motion/BirdFlight";
import Spotlight from "@/site/motion/Spotlight";
import Hero from "@/site/home/Hero";
import Gatekeep from "@/site/home/Gatekeep";
import Premise from "@/site/home/Premise";
import Engine from "@/site/home/Engine";
import ChatFloor from "@/site/home/ChatFloor";
import Operation from "@/site/home/Operation";
import FilmBand from "@/site/home/FilmBand";
import Levers from "@/site/home/Levers";
import Wins from "@/site/home/Wins";
import Phases from "@/site/home/Phases";
import Terms from "@/site/home/Terms";
import Comparison from "@/site/home/Comparison";
import Closing from "@/site/home/Closing";
import ApplySection from "@/site/home/ApplySection";
import FaqSection from "@/site/home/FaqSection";
import { useReveal, useRouteSeo } from "@/site/hooks";

/**
 * Home. Hero, the ticker, the premise (pinned), the content engine (pinned),
 * the chat floor (pinned), the operation (pinned horizontal), the film, the
 * levers, the wins, ninety days, plain terms, the comparison, the close,
 * the application and the questions. The bird flies through the middle.
 */
export default function Home() {
  useRouteSeo("/");
  useReveal();
  return (
    <SiteChrome home>
      <Spotlight />
      <BirdFlight />
      <Hero />
      <Gatekeep />
      <Premise />
      <Engine />
      <ShardDivider />
      <ChatFloor />
      <Operation />
      <FilmBand />
      <Levers />
      <ShardDivider />
      <Wins />
      <Phases />
      <Terms />
      <ShardDivider />
      <Comparison />
      <Closing />
      <ApplySection />
      <FaqSection />
    </SiteChrome>
  );
}
