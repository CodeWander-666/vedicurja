'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import AnimatedText, { GradientText } from '@/components/ui/AnimatedText';
import Mandala3D from '@/components/svg/Mandala3D';
import FloatingParticles from '@/components/svg/FloatingParticles';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';

// ----------------------------------------------------------------------
// Hero Section
// ----------------------------------------------------------------------
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section ref={ref} style={{ opacity }} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-vastu-parchment via-white to-vastu-parchment">
      <Mandala3D />
      <FloatingParticles />
      <motion.div style={{ y }} className="container mx-auto px-6 relative z-10 text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sacred-saffron uppercase tracking-[0.3em] text-sm mb-4 block">
          Our Sacred Lineage
        </motion.span>
        <AnimatedText text="About VedicUrja" className="font-serif text-5xl md:text-7xl lg:text-8xl text-nidra-indigo mb-4" />
        <GradientText text="A Sanctuary of Timeless Wisdom" className="font-serif text-2xl md:text-3xl mb-6 block" />
      </motion.div>
    </motion.section>
  );
}

// ----------------------------------------------------------------------
// Main Content
// ----------------------------------------------------------------------
function AboutContent() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="prose prose-lg prose-stone mx-auto">
          <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-prakash-gold first-letter:float-left first-letter:mr-3 first-letter:leading-tight">
            It is with the deepest reverence for the ancient sciences and a profound sense of responsibility toward the modern seeker that we welcome you to VedicUrja. This is not a place of recent origin, nor a fleeting digital experiment born from the transient whims of the internet age. VedicUrja stands as a sanctuary of immense patience and unbroken continuity, an institution whose roots delve deep into the soil of time itself, long before the architecture of the world wide web was conceived, and whose digital foundations were laid with the meticulous care of a craftsman who understands that true permanence is not a matter of months but of decades. For well over a decade and a half, through the silent evolution of the digital age, this platform has remained a constant, unwavering beacon for those who understand that the cosmos is not merely space, but a living, breathing consciousness that shapes our dwellings, our names, and our destinies.
          </p>

          <p>
            We have borne witness to the transient rise and fall of countless trends, to the ephemeral nature of platforms that promised much and delivered little, yet we have remained steadfast, anchored not in the shifting sands of novelty, but in the immutable granite of the Vedas and the sacred transmissions of an unbroken Guru-Shishya Parampara. When you step across this threshold, you are not engaging with a website that was hastily assembled in recent months; you are entering a heritage institution whose digital foundations were laid in an era when online spiritual guidance was a path chosen only by the most dedicated, and whose walls have been carefully, lovingly, and meticulously fortified by nearly two decades of unwavering sadhana and global service.
          </p>

          <div className="my-12 p-8 bg-vastu-stone/20 rounded-2xl border-l-4 border-prakash-gold italic">
            <p className="text-xl font-serif text-nidra-indigo">
              "The soul of VedicUrja is not an algorithm. The soul of VedicUrja is a living lineage, a direct and sacred inheritance from masters whose wisdom transcends the limitations of textbooks."
            </p>
          </div>

          <p>
            The soul of VedicUrja is not an algorithm, though our technology is of the highest calibre and we stand at the forefront of integrating modern computational tools with ancient wisdom. The soul of VedicUrja is a living lineage, a direct and sacred inheritance from masters whose wisdom transcends the limitations of textbooks and enters the realm of direct, experiential transmission. Our custodian and Acharya began his personal pilgrimage into these profound sciences not as a professional endeavor, but as a silent, inner calling in the year 2008. For a full decade, this journey was one of intense personal experimentation, deep meditative absorption, and the quiet cultivation of a connection to the subtle energies that underpin Vastu Shastra, Nadi Jyotish, and Vedic Numerology. It was a period of rigorous inner preparation—a decade of testing, learning, observing the cosmic pulse, and aligning oneself with the rhythms of the universe before daring to offer guidance to another soul. It was only after this extensive and demanding period that the professional mantle was formally and respectfully assumed in 2018, marking the moment when private sadhana blossomed into public service and VedicUrja began its journey as a trusted name for seekers across the globe.
          </p>

          <p>
            This is a critical distinction. The wisdom you receive here is not the product of a weekend certification, nor is it a hastily acquired skill from an online course. It is the distilled essence of a path walked with unwavering discipline for the better part of two decades, a journey that has been acknowledged and validated by the trust of countless clients. Indeed, as reflected in the genuine testimonials and ratings found across various platforms, those who have sought guidance from VedicUrja consistently praise the deep knowledge and understanding of astrology and numerology, highlighting the humility and scientific approach of the Acharya, and expressing profound satisfaction with the personalized attention and effective, result-oriented remedies provided.
          </p>

          <h2 className="font-serif text-3xl text-nidra-indigo mt-12 mb-6">The Sacred Lineage</h2>

          <p>
            And at the very core of this path lie the blessings and the rigorous scholarly transmissions received from a constellation of the most revered luminaries in the Vedic world. This knowledge is not self-proclaimed; it is bestowed, a sacred trust passed down through the ancient and hallowed Guru-Shishya Parampara, a tradition that recognizes that the highest truths cannot be learned from books alone but must be absorbed through direct communion with a realized master. From the silent, snow-clad sanctity of the Siddh Peeth of the Himalaya, we received that which cannot be spoken but can only be felt: the foundational, energetic spine that supports every Vastu correction and every sacred ritual, the ineffable transmission of cosmic energy that forms the invisible architecture of all our work.
          </p>

          <p>
            This inner foundation was then refined and given precise, scholarly structure by the grace of three towering pillars of Vastu Shastra: Dr. Shiv Verma, Dr. Narendra Sahastrabuddhe, and Dr. Rajendra Jain. To have sat at the feet of these Acharyas is to have drunk from the very source of India's architectural and spatial wisdom, a knowledge system that is rooted in the Vedas, particularly the Atharvaveda and Rigveda, and which intricately weaves together the art of construction with the orchestration of harmonious living spaces in consonance with natural laws and cosmic energies.
          </p>

          <p>
            Furthermore, the celestial and enigmatic sciences of Nadi Jyotish and the sacred vibration of the Name were imparted to us through a lineage of unparalleled depth and grace. We carry the direct transmission of Shri Thanga Pandiyan, the unrivaled master of the Astrological Science of Names, whose insight into the nakshatras and syllables is a rare and precious treasure. This knowledge was further illuminated by the luminous guidance of Shri Umang Taneja and enveloped in the divine grace of Shri Jai Baba Klaipriyar. We state these names not as a mere list of credentials to be scanned and forgotten, but as a sacred invocation of gratitude, a humble acknowledgment that without their blessings and the weight of their knowledge, the vessel of VedicUrja would be empty of the very essence it seeks to share with the world.
          </p>

          <h2 className="font-serif text-3xl text-nidra-indigo mt-12 mb-6">The Science of Spatial Harmony</h2>

          <p>
            The profound and timeless knowledge that we have been privileged to inherit is, in our view, as vital and relevant today as it has ever been, if not more so. We do not view Vastu Shastra as a relic of a bygone era, but as a living, breathing science of spatial harmony. At its heart, Vastu Shastra is a deeply scientific system that is built upon a holistic understanding of the Pancha Mahabhutas, the five great elements that constitute the universe: earth, water, fire, air, and space. The core principle is to maintain a perfect balance between one's dwelling and these fundamental elements of the universe to ensure happiness, comfort, and prosperity.
          </p>

          <p>
            This is not a matter of blind faith; it is a philosophy that increasingly finds resonance with modern scientific inquiry. Contemporary research, including studies published in esteemed academic forums, has begun to empirically validate the core principles of Vastu Shastra. For instance, a recent study using computational fluid dynamics to investigate the effectiveness of Vastu features found that the thermal comfort predicted by Vastu's recommendations for door placements was demonstrably beneficial to inhabitants, providing a tangible, engineering-based validation for an ancient practice. Similarly, other scholarly works have unfurled Vastu Shastra under scientific scrutiny, compellingly supporting its core tenets and confirming how our physical surroundings intimately intertwine with our well-being, fortune, and prosperity. The science is clear: the design and orientation of a building profoundly impact the flow of energy within it, and by aligning our built environment with the natural forces of the universe, we can demonstrably enhance the quality of our existence.
          </p>

          <h2 className="font-serif text-3xl text-nidra-indigo mt-12 mb-6">Nadi Jyotish & Vedic Numerology</h2>

          <p>
            In the realm of Nadi Jyotish, we are dealing with a tradition that is shrouded in the mists of time, an ancient and sacred science whose origins can be traced back thousands of years. It is said that the Indian Rishis or sages, including the revered Sapta Rishis (seven sages), used their divine sight and immense Yogic intuitive powers to look into the future and inscribe the life patterns of countless individuals onto palm leaves. These unique leaves, written in an ancient Tamil script called Vatta Ezhuthu with a sharp, nail-like instrument, were initially preserved in temple libraries and have been passed down through generations of dedicated Nadi readers, representing a continuous, unbroken lineage of hereditary knowledge that has survived for millennia.
          </p>

          <p>
            The existence of these leaves, and the accuracy with which they can reveal intimate details of a person's past, present, and even their name and lineage, stands as one of the most profound and mysterious testaments to the depth of Vedic wisdom. The Nadi readers, as they themselves humbly state, do not add anything to what is written; they are merely the vessels, the translators of a divine script that was etched into existence by beings of immense spiritual stature. To have received direct training in this art, and in the related science of Vedic Numerology, is to be a custodian of a fragment of this cosmic library.
          </p>

          <p>
            This latter science, Vedic Numerology, is also a discipline of immense subtlety and power. It is based on the foundational Vedic truth of Sabda Brahma, the understanding that "Sound is God". Your name is not a mere label; it is a mantra, a vibrational code, a sound-pattern that, every time it is uttered, sends a specific ripple into the universe and deep into your own subconscious. The science dictates that a child's name, for example, should begin with a specific syllable corresponding to their birth Nakshatra, or lunar mansion. Each of the twenty-seven Nakshatras that landmark the zodiac is associated with particular sound syllables, and to name a child in alignment with this cosmic blueprint is to create a powerful, harmonious resonance between the individual's identity and the planetary energies present at their birth, thereby strengthening their emotional balance, luck, and intuitive alignment throughout their life.
          </p>

          <h2 className="font-serif text-3xl text-nidra-indigo mt-12 mb-6">Our Global Presence</h2>

          <p>
            It is this profound and multifaceted wisdom that we have been honored to offer to a discerning global clientele for many years. Our service is not a product to be packaged and sold like any other commodity; it is a sacred trust to be honored with the deepest integrity and the highest level of professional conduct. For those embarking on the creation of a new home, we offer comprehensive guidance that begins before the first brick is laid, ensuring that the planning of the entire structure is in perfect alignment with the five elements and the cardinal directions. This culminates in the powerful, transformative rituals and energy alignments of Griha Pravesh, the sacred rites that consecrate a house of brick and mortar into a living vessel of positivity and grace.
          </p>

          <p>
            For those residing in homes that have stood for generations, we provide the delicate, non-invasive art of Vastu correction, mending energetic fractures without necessitating any major demolition or physical upheaval, restoring the flow of harmony and well-being with subtle yet profoundly effective remedies. Our expertise extends deep into the earth itself, with detailed land energy assessments that read the silent, subtle pulse of a plot before any human intention is imposed upon it, ensuring that the very ground upon which you build or invest is in a state of grace and balance. And for the world of commerce, our Commercial Vastu services have been honed over years of practical application, elevating retail spaces, corporate offices, and industrial units from mere centers of transaction to thriving ecosystems of prosperity, creativity, and collective well-being. Alongside this mastery of space, we offer the rare and precise science of the Name and Number, a discipline transmitted through the grace of Shri Thanga Pandiyan, which aligns the vibrational signature of an individual or a business with the cosmic blueprint of their birth, ensuring that every utterance of a name is a subtle reinforcement of one's highest destiny and a harmonious echo of the cosmos itself.
          </p>

          <p>
            Our presence is not confined to the borders of a single nation, nor is our vision limited by geography. We stand at a unique moment in history where the world is turning, with increasing speed and sincerity, toward the ancient wisdom of the East. The global spiritual products and services market is not a niche curiosity; it is a massive, multi-billion dollar industry, projected to reach nearly two hundred billion dollars in the coming years, driven by a universal human desire for meaning, balance, and holistic well-being in an increasingly complex and stressful world. Vedic-based astrology, numerology, and Vastu Shastra are at the forefront of this global resurgence, experiencing renewed and widespread interest for personal insights, decision-making guidance, and the creation of harmonious living and working environments.
          </p>

          <p>
            For many years, the gentle yet powerful reach of VedicUrja has extended across the vast oceans, serving as a spiritual and practical anchor for the global Indian diaspora and a trusted guide for Western seekers of holistic truth. We have been privileged to offer our guidance and to witness profound transformation in the lives of clients residing in the United States, the United Kingdom, the Netherlands, New Zealand, and numerous other corners of the globe.
          </p>

          <div className="my-12 p-8 bg-gradient-to-r from-nidra-indigo to-nidra-indigo/90 text-white rounded-2xl text-center">
            <p className="text-xl font-serif">
              This is the enduring promise of VedicUrja: a wisdom that is timeless, a presence that is unwavering, a lineage that is pure, and a sanctuary that has been, and will continue to be, the definitive answer for those who seek to live in perfect, harmonious alignment with the cosmic order.
            </p>
          </div>

          <p>
            We invite you to step not merely into a website, but into a legacy. The doors of this sanctuary, established in the quiet dedication of 2008 and opened to the world as a professional practice in 2018, have been open for a very long time, and they shall remain open, unwavering and resolute, for all the generations yet to come.
          </p>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Final CTA
// ----------------------------------------------------------------------
function FinalCTA() {
  return (
    <section className="py-20 bg-vastu-parchment text-center">
      <div className="container mx-auto px-6">
        <AnimatedText text="Begin Your Journey" className="font-serif text-3xl text-nidra-indigo mb-6" />
        <p className="text-nidra-indigo/70 mb-8">Experience the transformative power of authentic Vedic wisdom.</p>
        <a href="/contact" className="luxury-button inline-block">Consult Acharya</a>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Main Page
// ----------------------------------------------------------------------
export default function AboutPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative bg-vastu-parchment">
          <HeroSection />
          <AboutContent />
          <FinalCTA />
        </main>
      </SmoothScroll>
    </>
  );
}
