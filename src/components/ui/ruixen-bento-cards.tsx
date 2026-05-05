"use client"

import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const cardContents = [
  {
    title: "Clinical Precision",
    description:
      "AIVoice OS handled 150+ pediatric appointments this week with 0% missed calls and real-time EMR updates for all scheduled visits.",
  },
  {
    title: "HIPAA Standard",
    description:
      "Every patient recording is auto-redacted and stored in SOC2 Type II secure silos, ensuring total medical privacy and compliance.",
  },
  {
    title: "Omnichannel Presence",
    description:
      "Launched 5 dental clinics simultaneously across the tri-state area using a single agency dashboard. Whether you're managing single locations or multi-clinic groups, AIVoice OS provides composable clinical workflows that scale beautifully across specialties. With multi-tenant defaults, built-in EMR mappings, and utilities like scheduling control, your agency's AI adapts effortlessly to every clinic's unique requirements.",
  },  
  {
    title: "EMR Sync",
    description:
      "Seamlessly synced post-op follow-up notes for 45 patients directly into Epic and Cerner systems after a massive recall campaign.",
  },
  {
    title: "24/7 Availability",
    description:
      "Managed 12 emergency call redirects during the weekend holiday, ensuring no patient was left without immediate clinical guidance.",
  },
]


const PlusCard: React.FC<{
  className?: string
  title: string
  description: string
}> = ({
  className = "",
  title,
  description,
}) => {
  return (
    <div
      className={cn(
        "relative border border-dashed border-black dark:border-white rounded-lg p-6 bg-white dark:bg-zinc-950 min-h-[200px]",
        "flex flex-col justify-between",
        className
      )}
    >
      <CornerPlusIcons />
      {/* Content */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-xl font-black text-black dark:text-white">
          {title}
        </h3>
        <p className="text-zinc-900 dark:text-zinc-300 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`dark:text-white text-black size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

export default function RuixenBentoCards() {
  return (
    <section className="bg-white dark:bg-black/20 border border-black dark:border-white/20">
      <div className="mx-auto container border-x border-black dark:border-white/20 py-12 px-4">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
          <PlusCard {...cardContents[0]} className="lg:col-span-3 lg:row-span-2" />
          <PlusCard {...cardContents[1]} className="lg:col-span-2 lg:row-span-2" />
          <PlusCard {...cardContents[2]} className="lg:col-span-4 lg:row-span-1" />
          <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[4]} className="lg:col-span-2 lg:row-span-1" />
        </div>

        {/* Section Footer Heading */}
        <div className="max-w-2xl ml-auto text-right px-4 mt-6 lg:-mt-20">
          <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4">
            Built for Clinics. Designed for Agencies.
          </h2>
          <p className="text-zinc-800 dark:text-zinc-400 text-lg font-medium">
            AIVoice OS provides the infrastructure for medical marketing agencies to deploy high-converting, clinically reliable voice AI to their clients. Each workflow is thoughtfully designed to be HIPAA compliant, reliable, and patient-first.
          </p>
        </div>
      </div>
    </section>
  )
}
