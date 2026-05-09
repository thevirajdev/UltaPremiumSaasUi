import Footer from "@/components/ui/animated-footer";

const DemoOne = () => {
  return  <Footer
          leftLinks={[
            { href: "/terms", label: "Terms & policies" },
            { href: "/privacy-policy", label: "Privacy policy" },
          ]}
          rightLinks={[
            { href: "/careers", label: "Careers" },
            { href: "/about", label: "About" },
            { href: "/help-center", label: "Help Center" },
            { href: "https://youtube.com/@thevirajrealm", label: "YouTube" },
            { href: "https://www.instagram.com/thevirajrealm", label: "Instagram" },
            { href: "https://linkedin.com/in/thevirajrealm", label: "LinkedIn" },
          ]}
          copyrightText="AIVOICE OS 2026. All Rights Reserved"
          barCount={23}
        />;
};

export { DemoOne as DemoAnimatedFooter };
