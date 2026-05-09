"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import TextareaWithHelperTextDemo from "./text-area-demo";
import { DemoInput } from "./demo-input";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "/#" },
      { name: "Pricing", href: "/#pricing" },
      { name: "Marketplace", href: "/#" },
      { name: "Features", href: "/#features" },
      { name: "Integrations", href: "/#" },
      { name: "API Documentation", href: "/#" },
      { name: "Changelog", href: "/#" },
      { name: "Releases", href: "/#" },
      { name: "Security", href: "/#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/#" },
      { name: "Team", href: "/#" },
      { name: "Blog", href: "/#" },
      { name: "Careers", href: "/#" },
      { name: "Press", href: "/#" },
      { name: "Partners", href: "/#" },
      { name: "Contact", href: "/#contact" },
      { name: "Investors", href: "/#" },
      { name: "Brand Guidelines", href: "/#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "/#" },
      { name: "Sales", href: "/#" },
      { name: "Advertise", href: "/#" },
      { name: "Privacy", href: "/#" },
      { name: "Terms of Service", href: "/#" },
      { name: "Community", href: "/#" },
      { name: "Tutorials", href: "/#" },
      { name: "Webinars", href: "/#" },
      { name: "Guides", href: "/#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/thevirajrealm", label: "Instagram" },
  { icon: <FaTwitter className="size-5" />, href: "https://youtube.com/@thevirajrealm", label: "YouTube" },
  { icon: <FaLinkedin className="size-5" />, href: "https://linkedin.com/in/thevirajrealm", label: "LinkedIn" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "AIVOICE OS",
    title: "AIVOICE OS",
  },
  sections = defaultSections,
  description = "The premier operating system for medical voice AI. Powered by nexautomate.in, trusted by clinics worldwide.",
  socialLinks = defaultSocialLinks,
}: Footer7Props) => {
  return (
    <section className="py-20 bg-background text-foreground w-full">
      <div className="w-full px-4 md:px-8">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start lg:max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8"
                />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Added Components Under Social Icons */}
            <div className="flex flex-col gap-8 mt-4 w-full">
              <TextareaWithHelperTextDemo />
              <DemoInput />
            </div>
            
          </div>
          <div className="grid w-full gap-10 md:grid-cols-3 lg:gap-32 lg:w-max lg:ml-auto text-left lg:text-right">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-bold text-foreground">{section.title}</h3>
                <ul className="space-y-6 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
