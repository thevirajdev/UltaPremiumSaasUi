"use client"

import React, { useEffect, useRef, useState } from "react"
import { ShieldCheckIcon, Check, Crown, Star } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { BorderTrail } from "@/components/ui/border-trail"

export function CombinedPricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  // Features
  const features = [
    "Advanced Real-time Analytics",
    "Unlimited Team Members",
    "Custom Integrations (API)",
    "White-label Reports",
    "HIPAA Compliance & Security",
    "24/7 Priority Support",
  ]

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Operations Director",
      company: "HealthPlus",
      content:
        "This platform saved us weeks of setup time. The analytics integration is flawless, and the components are incredibly easy to navigate.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Clinic Manager",
      company: "MedCare Associates",
      content:
        "We've used many solutions, but ClinicAI stands out for its clean architecture and attention to detail. The team support is excellent.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "David Park",
      role: "CTO",
      company: "InnovateLabs",
      content:
        "Our team was able to launch our MVP in record time thanks to this platform. Everything worked right out of the box. Highly recommended!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="relative w-full py-24 bg-transparent" id="pricing" ref={sectionRef}>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-1 px-3 py-1 mb-4 rounded-full border border-primary/20 shadow-sm bg-background/50 backdrop-blur text-foreground">
              <Crown className="mr-1 h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium">Simple Pricing</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-foreground">
              Pricing Based on Your Success
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed">
              We offer simple, transparent pricing for all our services. Unlock everything you need to build your next great application.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl"
        >
          <Card className="overflow-hidden border border-primary/10 relative group bg-background/60 backdrop-blur-xl">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-primary/5 via-primary/2 to-transparent pointer-events-none" />
            
            <div className="flex flex-col md:flex-row">
              {/* Left column - Pricing details */}
              <div className="p-6 md:p-8 md:w-[55%] flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Premium Plan</h3>
                  <p className="text-muted-foreground mb-6">Build your SaaS application with this premium starter toolkit.</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="relative border border-border/50 rounded-xl bg-background/50 p-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="leading-none font-semibold text-foreground">Monthly</h3>
                        </div>
                        <p className="text-muted-foreground text-xs pt-1">Best value for growing businesses!</p>
                      </div>
                      <div className="mt-6 space-y-4">
                        <div className="text-muted-foreground flex items-end gap-0.5 text-xl">
                          <span>$</span>
                          <span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter">
                            7.99
                          </span>
                          <span>/mo</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          Start Monthly
                        </Button>
                      </div>
                    </div>

                    <div className="relative rounded-xl border border-primary/20 bg-background p-4 shadow-sm">
                      <BorderTrail
                        style={{
                          boxShadow: '0px 0px 60px 30px rgb(255 255 255 / 10%), 0 0 100px 60px rgb(0 0 0 / 10%), 0 0 140px 90px rgb(0 0 0 / 10%)',
                        }}
                        size={120}
                        className="bg-primary/50"
                      />
                      <div className="space-y-1 relative z-10">
                        <div className="flex items-center justify-between">
                          <h3 className="leading-none font-semibold text-foreground">Yearly</h3>
                          <Badge variant="default" className="text-[10px] px-1.5 py-0 bg-primary/90 text-primary-foreground">22% OFF</Badge>
                        </div>
                        <p className="text-muted-foreground text-xs pt-1">Unlock savings with an annual commitment!</p>
                      </div>
                      <div className="mt-6 space-y-4 relative z-10">
                        <div className="text-muted-foreground flex items-end text-xl">
                          <span>$</span>
                          <span className="text-primary -mb-0.5 text-4xl font-extrabold tracking-tighter">
                            6.99
                          </span>
                          <span>/mo</span>
                        </div>
                        <Button className="w-full">
                          Get Started Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground flex items-center gap-x-2 text-sm mt-4">
                  <ShieldCheckIcon className="size-4 text-green-500 shrink-0" />
                  <span>Access to all features with no hidden fees or extra costs.</span>
                </div>
              </div>

              {/* Right column - Features */}
              <div className="p-6 md:p-8 md:w-[45%] md:border-l border-border/50 bg-muted/20">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-foreground">Included Features</h4>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">All Features</Badge>
                </div>

                <div className="space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Separator className="my-6 bg-border/50" />

                <div className="rounded-xl p-5 border border-border/50 bg-background/50 relative overflow-hidden min-h-[150px] shadow-sm">
                  <AnimatePresence mode="wait">
                    {testimonials.map(
                      (testimonial, index) =>
                        index === currentTestimonialIndex && (
                          <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 p-5"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="h-9 w-9 rounded-full overflow-hidden shrink-0 border border-border">
                                <img
                                  src={testimonial.avatar || "/placeholder.svg"}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-foreground truncate">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {testimonial.role}
                                </p>
                              </div>
                              <div className="flex shrink-0">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm italic text-muted-foreground line-clamp-3">"{testimonial.content}"</p>
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center mt-4 gap-1.5">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === currentTestimonialIndex ? "w-5 bg-primary" : "w-1.5 bg-primary/30"
                      )}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
