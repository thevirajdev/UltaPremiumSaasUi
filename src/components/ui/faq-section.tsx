import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, ShieldCheck, Database, Zap, Lock, RefreshCw } from "lucide-react";

const items = [
  {
    id: "1",
    icon: Database,
    title: "Is ClinicAI HIPAA compliant?",
    content:
      "Yes. ClinicAI is built from the ground up for healthcare. We sign BAAs with all our agency partners, and all voice data is encrypted using military-grade standards both in transit and at rest.",
  },
  {
    id: "2",
    icon: RefreshCw,
    title: "How does EMR integration work?",
    content:
      "We provide bi-directional sync for most major EMR systems. ClinicAI can check real-time availability for appointments and write consultation summaries directly back to the patient chart after a call.",
  },
  {
    id: "3",
    icon: Zap,
    title: "Can I customize the AI's voice and personality?",
    content:
      "Absolutely. You can choose from dozens of professional medical-grade voices and provide specific training data, clinic protocols, and knowledge bases to ensure the AI speaks exactly like your clinic staff.",
  },
  {
    id: "4",
    icon: ShieldCheck,
    title: "What are the white-label options for agencies?",
    content:
      "Our platform is built for agencies. You can fully white-label the dashboard, client reports, and caller IDs, allowing you to offer ClinicAI as a proprietary solution to your medical clients.",
  },
  {
    id: "5",
    icon: Lock,
    title: "How is billing handled for multi-clinic agencies?",
    content:
      "We provide a unified billing console where you can track usage across all your clients. You'll see granular breakdowns for HIPAA costs, AI credit usage, and setup fees, making it easy to manage your agency margins.",
  }
];

export function FAQSection() {
  return (
    <section className="py-24" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 justify-center max-w-6xl mx-auto">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mb-8">
              Everything you need to know about ClinicAI, EMR integration, and agency billing. Can't find the answer you're looking for? Reach out to our clinical support team below.
            </p>
          </div>
          <div className="md:w-2/3 bg-background/60 backdrop-blur-md rounded-2xl border border-border/50 p-6 shadow-sm">
            <Accordion type="single" collapsible className="w-full" defaultValue="1">
              {items.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="py-2">
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                      <span className="flex items-center gap-3">
                        <item.icon
                          size={18}
                          strokeWidth={2}
                          className="shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-foreground">{item.title}</span>
                      </span>
                      <Plus
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 opacity-60 transition-transform duration-200 text-foreground"
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="pb-4 ps-8 text-muted-foreground text-sm leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
