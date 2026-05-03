import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, ShieldCheck, Database, Zap, Lock, RefreshCw } from "lucide-react";

const items = [
  {
    id: "1",
    icon: Database,
    title: "Is ClinicAI HIPAA compliant?",
    content:
      "Yes. ClinicAI is built from the ground up with healthcare compliance in mind. All data is encrypted at rest and in transit, meeting or exceeding HIPAA and GDPR standards.",
  },
  {
    id: "2",
    icon: RefreshCw,
    title: "How difficult is the integration process?",
    content:
      "Integration is seamless. We provide comprehensive API documentation and out-of-the-box connectors for most major EHR and practice management systems. Most clinics are up and running within a week.",
  },
  {
    id: "3",
    icon: Zap,
    title: "What kind of performance improvements can we expect?",
    content:
      "On average, our partner clinics report a 40% reduction in administrative overhead and a 25% decrease in no-show rates within the first three months of utilizing our automated patient engagement tools.",
  },
  {
    id: "4",
    icon: ShieldCheck,
    title: "Do you offer white-label solutions for agencies?",
    content:
      "Absolutely. Our Enterprise tier includes full white-labeling capabilities, allowing you to rebrand the dashboard, reports, and patient-facing interfaces as your own.",
  },
  {
    id: "5",
    icon: Lock,
    title: "What happens to our data if we cancel?",
    content:
      "You own your data. If you choose to terminate your subscription, we provide secure data export tools to ensure you can securely transition your records before we permanently delete them from our servers.",
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
              Everything you need to know about ClinicAI, integration, and billing. Can't find the answer you're looking for? Reach out to our team below.
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
