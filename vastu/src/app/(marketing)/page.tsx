'use client';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { CosmicHero } from '@/components/sections/home/CosmicHero';
import { TrustMarquee } from '@/components/sections/home/TrustMarquee';
import { AcharyaVow } from '@/components/sections/home/AcharyaVow';
import { SacredServices } from '@/components/sections/home/SacredServices';
import { FreeAITools } from '@/components/sections/home/FreeAITools';
import { VirtualConsultCTA } from '@/components/sections/home/VirtualConsultCTA';
import { WordsOfGratitude } from '@/components/sections/home/WordsOfGratitude';
import { SacredArchives } from '@/components/sections/home/SacredArchives';
import { LearnVastuTeaser } from '@/components/sections/home/LearnVastuTeaser';
import { GlobalPresence } from '@/components/sections/home/GlobalPresence';
import { SocialMediaFeed } from '@/components/sections/home/SocialMediaFeed';
import FAQSection from '@/components/testimonials/FAQSection';
import { FinalCTA } from '@/components/sections/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <CosmicHero />
          <TrustMarquee />
          <AcharyaVow />
          <SacredServices />
          <div id="free-tools"><FreeAITools /></div>
          <VirtualConsultCTA />
          <WordsOfGratitude />
          <SacredArchives />
          <LearnVastuTeaser />
          <GlobalPresence />
          <SocialMediaFeed />
          <FAQSection />
          <FinalCTA />
        </main>
      </SmoothScroll>
    </>
  );
}
