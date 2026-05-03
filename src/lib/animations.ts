"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Stat counter — use on dashboard numbers
export const animateCounters = (selector: string) => {
  document.querySelectorAll(selector).forEach((el) => {
    const target = parseFloat(el.getAttribute("data-target") || "0");
    gsap.fromTo(
      { val: 0 },
      { val: target },
      {
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function () {
          el.textContent = Math.ceil(this.targets()[0].val)
            .toLocaleString();
        },
      }
    );
  });
};

// Stagger cards — use after page load
export const staggerCards = (selector: string) => {
  gsap.from(selector, {
    y: 32, opacity: 0, duration: 0.5,
    stagger: 0.08, ease: "power2.out",
  });
};

// Scroll reveal — wrap any section
export const scrollReveal = (selector: string) => {
  gsap.from(selector, {
    scrollTrigger: { trigger: selector, start: "top 85%" },
    y: 48, opacity: 0, duration: 0.7, ease: "power3.out",
  });
};
