"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "This platform revolutionized our operations, streamlining finance and inventory. The cloud-based setup keeps us productive, even remotely.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "Seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this tool, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-lg max-w-xs w-full" key={i}>
                  <div className="text-zinc-700 dark:text-zinc-300">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-zinc-900 dark:text-zinc-100">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-zinc-600 dark:text-zinc-400">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="bg-transparent pt-8 pb-20 md:pt-12 relative w-full overflow-hidden">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-zinc-200 dark:border-zinc-800 py-1 px-4 rounded-lg text-sm text-zinc-600 dark:text-zinc-400">
              Testimonials
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center text-foreground">
            What our users say
          </h2>
          <p className="text-center mt-5 text-zinc-600 dark:text-zinc-400">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
