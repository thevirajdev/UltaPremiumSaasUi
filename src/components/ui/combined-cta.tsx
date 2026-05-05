"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { TextEffect } from "@/components/ui/text-effect";
import { useInView } from "framer-motion";
import { useRef } from "react";

const defaultItems = [
  "EMR Integration",
  "HIPAA Compliant",
  "White-label Dashboard",
  "Clinical Personas",
  "24/7 Agency Support",
];

export const CombinedCTA = ({
  title = "Ready to launch your Agency OS?",
  description = "Join the medical marketing agencies who are already accelerating their growth with ClinicAI. Deploy clinical voice AI today and unlock the full potential of your agency.",
  buttonText = "Get Started Now",
  buttonUrl = "/#contact",
  items = defaultItems,
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full">
            <div className="flex flex-col items-center md:items-start justify-between gap-12 rounded-3xl bg-muted/30 border border-border/50 px-6 py-12 md:flex-row lg:px-16 lg:py-20 backdrop-blur-sm relative overflow-hidden">
              
              {/* Decorative background glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

              <div className="md:w-[55%] flex flex-col items-center md:items-start text-center md:text-left z-10">
                {isInView && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 text-foreground leading-[1.2]">
                    Ready to launch your
                    <br />
                    <AnimatedText 
                      text="Agency OS?"
                      textClassName="text-3xl md:text-4xl lg:text-5xl font-black text-foreground"
                      underlineClassName="text-primary opacity-80"
                    />
                  </h2>
                )}
                
                <div className="mt-8 min-h-[80px]">
                  {isInView && (
                    <TextEffect 
                      preset="fade" 
                      per="word" 
                      className="text-muted-foreground text-lg leading-relaxed"
                    >
                      {description}
                    </TextEffect>
                  )}
                </div>
                
                {isInView && (
                  <Button className="mt-8 rounded-full h-12 px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105" asChild>
                    <a href={buttonUrl}>
                      {buttonText} <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                )}
              </div>

              <div className="md:w-[40%] w-full bg-background/60 rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm z-10 backdrop-blur-md">
                <h4 className="text-lg font-semibold mb-6 text-foreground">Everything you need to succeed:</h4>
                <ul className="flex flex-col space-y-4 text-base font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center text-muted-foreground" key={idx}>
                      <div className="mr-4 rounded-full bg-primary/10 p-1 shrink-0">
                        <Check className="size-4 text-primary" />
                      </div>
                      {isInView && (
                        <TextEffect 
                          preset="slide" 
                          per="line" 
                          delay={0.5 + (idx * 0.1)}
                        >
                          {item}
                        </TextEffect>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
