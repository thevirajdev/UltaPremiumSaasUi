"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function FeaturedSectionStats() {
  const data = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 80 },
    { name: "May", value: 100 },
    { name: "Jun", value: 130 },
    { name: "Jul", value: 160 },
  ];

  return (
    <section className="w-full text-left pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="w-full px-4 md:px-8">
        <h3 className="text-lg sm:text-xl lg:text-4xl font-medium text-foreground mb-16">
          Powering clinics with real-time conversational intelligence.{" "}
          <span className="text-muted-foreground text-sm sm:text-base lg:text-4xl">
            Our next-gen clinical dashboard helps you track patient sentiment, manage
            appointments, and optimize medical workflows in seconds.
          </span>
        </h3>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
          <div>
            <p className="text-3xl font-medium text-foreground">1.2M+</p>
            <p className="text-muted-foreground text-md">Clinical Conversations</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-foreground">99.9%</p>
            <p className="text-muted-foreground text-md">Uptime Guarantee</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-foreground">450ms</p>
            <p className="text-muted-foreground text-md">Voice Latency</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-foreground">HIPAA</p>
            <p className="text-muted-foreground text-md">Compliant Infrastructure</p>
          </div>
        </div>
      </div>

      {/* Area Chart */}
      <div className="w-full h-48 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBlue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
