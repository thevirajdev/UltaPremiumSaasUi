import { Hero } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Header } from "@/components/ui/header-2";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Features } from "@/components/ui/features-7";
import { FeaturesMetrics } from "@/components/ui/features-9";
import { FeaturesBento } from "@/components/ui/features-8";
import RuixenBentoCards from "@/components/ui/ruixen-bento-cards";
import FeaturedSectionStats from "@/components/ui/featured-section-stats";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { CombinedPricing } from "@/components/ui/combined-pricing";
import { CombinedCTA } from "@/components/ui/combined-cta";
import { FAQSection } from "@/components/ui/faq-section";
import { ContactSection } from "@/components/ui/contact-section";
import { RatingInteraction } from "@/components/ui/emoji-rating";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DemoAnimatedFooter } from "@/components/ui/demo-animated-footer";
import { DemoFooter7 } from "@/components/ui/demo-footer-7";

const logos = [
  { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia Logo" },
  { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase Logo" },
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI Logo" },
  { src: "https://svgl.app/library/turso-wordmark-light.svg", alt: "Turso Logo" },
  { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel Logo" },
  { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub Logo" },
  { src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude AI Logo" },
  { src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk Logo" },
];

export default function LandingPage() {
  return (
    <AuroraBackground>
      <Header />
      <Hero />
      <div className="flex flex-col overflow-hidden w-full -mt-32 lg:-mt-48 relative z-20">
        <ContainerScroll titleComponent={null}>
          <Image
            src="/dashboard.png?v=3"
            alt="ClinicAI Dashboard"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            unoptimized
          />
        </ContainerScroll>
      </div>

      <section className="relative mx-auto max-w-5xl w-full pt-4 pb-10 px-4 -mt-6 md:-mt-12">
        <h2 className="mb-4 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
          <span className="text-muted-foreground">Trusted by experts.</span>
          <br />
          <span className="font-semibold italic">Used by the leaders.</span>
        </h2>
        <div className="mx-auto my-8 h-px max-w-md bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
        <LogoCloud logos={logos} />
        <div className="mt-8 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </section>

      <Features />
      <FeaturesMetrics />
      <FeaturesBento />
      <RuixenBentoCards />
      <FeaturedSectionStats />
      <Testimonials />
      
      {/* Unified Background Section for Bottom Page Components */}
      <div className="relative w-full">
        <div
          className={cn(
            'z-0 pointer-events-none absolute inset-0 size-full',
            'bg-[linear-gradient(to_right,hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.05)_1px,transparent_1px)]',
            'bg-[size:32px_32px]',
            '[mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--background)_100%)]',
          )}
        />
        <CombinedPricing />
        <FAQSection />
        <ContactSection />
        <CombinedCTA />
        
        {/* Emoji Rating Interaction */}
        <div className="flex flex-col items-center gap-8 py-16 mt-8 z-10 relative">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            How was your experience exploring ClinicAI?
          </p>
          <RatingInteraction />
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
      
      <DemoFooter7 />
      <DemoAnimatedFooter />
    </AuroraBackground>
  );
}
