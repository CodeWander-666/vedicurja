'use client';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { CosmicHero } from '@/components/sections/home/CosmicHero';
import { AcharyaVow } from '@/components/sections/home/AcharyaVow';
import { FreeAITools } from '@/components/sections/home/FreeAITools';
import { SacredServices } from '@/components/sections/home/SacredServices';
import { GlobalTrust } from '@/components/sections/home/GlobalTrust';
import { WordsOfGratitude } from '@/components/sections/home/WordsOfGratitude';
import { LearnVastuTeaser } from '@/components/sections/home/LearnVastuTeaser';
import { VirtualConsultCTA } from '@/components/sections/home/VirtualConsultCTA';
import { SacredArchives } from '@/components/sections/home/SacredArchives';
import { LineageTimeline } from '@/components/sections/home/LineageTimeline';
import { GlobalPresence } from '@/components/sections/home/GlobalPresence';
import { FinalCTA } from '@/components/sections/home/FinalCTA';

export default function HomePage() {
  const scrollToScheduler = () => {
    document.getElementById('free-tools-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <CosmicHero />
          <AcharyaVow />
          <div id="free-tools-section">
            <FreeAITools />
          </div>
          <SacredServices />
          <GlobalTrust />
          <WordsOfGratitude />
          <LearnVastuTeaser />
          <VirtualConsultCTA />
          <SacredArchives />
          <LineageTimeline />
          <GlobalPresence />
          <FinalCTA />
        </main>
      </SmoothScroll>
    </>
  );
}
