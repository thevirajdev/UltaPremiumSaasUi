'use client'
import { Activity, Map as MapIcon, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function FeaturesMetrics() {
    return (
        <section className="w-full px-4 py-12 md:py-12">
            <div className="mx-auto grid w-full min-w-0 max-w-5xl lg:max-w-7xl border md:grid-cols-2 rounded-3xl overflow-hidden shadow-sm dark:border-border/50">
                <div>
                    <div className="p-4 sm:p-6 md:p-8">
                        <span className="text-muted-foreground flex items-center gap-2 text-sm md:text-base">
                            <MapIcon className="size-4" />
                            Global Voice Network
                        </span>

                        <p className="mt-4 md:mt-8 text-xl md:text-2xl font-semibold tracking-tight">Distributed voice servers for ultra-low latency calls. Reach patients anywhere, instantly.</p>
                    </div>

                    <div aria-hidden className="relative">
                        <div className="absolute inset-0 z-10 m-auto size-fit">
                            <div className="rounded-[--radius] bg-background z-[1] dark:bg-muted relative flex max-w-[85vw] text-center w-fit items-center gap-1 md:gap-2 border px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium shadow-md shadow-black/5 overflow-hidden">
                                <span className="text-sm md:text-lg shrink-0">📞</span> <span className="truncate">AI handled pediatric appointment call</span>
                            </div>
                            <div className="rounded-[--radius] bg-background absolute inset-2 -bottom-2 mx-auto border px-3 py-4 text-xs font-medium shadow-md shadow-black/5 dark:bg-zinc-900"></div>
                        </div>

                        <div className="relative overflow-hidden">
                            <div className="[background-image:radial-gradient(var(--tw-gradient-stops))] z-1 to-background absolute inset-0 from-transparent to-75%"></div>
                            <Map />
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden border-t bg-zinc-50/50 p-4 sm:p-6 md:p-8 md:border-0 md:border-l dark:bg-transparent">
                    <div className="relative z-10">
                        <span className="text-muted-foreground flex items-center gap-2 text-sm md:text-base">
                            <MessageCircle className="size-4" />
                            Patient AI Assistant
                        </span>

                        <p className="my-4 md:my-8 text-xl md:text-2xl font-semibold tracking-tight">Automate patient inquiries via voice, text, or web. Provide 24/7 empathetic care.</p>
                    </div>
                    <div aria-hidden className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex justify-center items-center size-5 rounded-full border">
                                    <span className="size-3 rounded-full bg-primary"/>
                                </span>
                                <span className="text-muted-foreground text-xs">Patient Inquiry</span>
                            </div>
                            <div className="rounded-[--radius] bg-background mt-1.5 w-4/5 md:w-3/5 border p-3 text-xs md:text-sm shadow-sm leading-relaxed">Hi, I'm feeling a bit anxious about my surgery tomorrow...</div>
                        </div>

                        <div>
                            <div className="rounded-[--radius] mb-1 ml-auto w-4/5 md:w-3/5 bg-primary text-primary-foreground p-3 text-xs md:text-sm shadow-sm leading-relaxed">I understand, that's completely normal. Let me share some pre-op relaxation tips and details on what to expect.</div>
                            <span className="text-muted-foreground block text-right text-xs">Now</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-y p-6 md:p-8 bg-zinc-50/30 dark:bg-transparent">
                    <p className="text-center text-3xl font-semibold md:text-4xl lg:text-6xl tracking-tighter">99.99% Clinical Reliability</p>
                </div>
                <div className="relative col-span-full w-full min-w-0 pb-0 md:pb-8 flex flex-col md:block">
                    <div className="relative md:absolute z-10 w-full max-w-lg px-6 pt-6 md:px-8 md:pt-8">
                        <span className="text-muted-foreground flex items-center gap-2 text-sm md:text-base">
                            <Activity className="size-4" />
                            Facility Audit Trail
                        </span>

                        <p className="mt-4 mb-4 md:mb-8 text-xl md:text-2xl font-semibold tracking-tight">
                            Monitor all AI interactions, bookings, and sentiment in real-time. <span className="text-muted-foreground"> Full HIPAA transparency.</span>
                        </p>
                    </div>
                    <MonitoringChart />
                </div>
            </div>
        </section>
    )
}

const map = new DottedMap({ height: 55, grid: 'diagonal' })

const points = map.getPoints()

const svgOptions = {
    backgroundColor: 'var(--color-background)',
    color: 'currentColor',
    radius: 0.15,
}

const Map = () => {
    const viewBox = `0 0 120 60`
    return (
        <svg viewBox={viewBox} style={{ background: svgOptions.backgroundColor }} className="opacity-30 dark:opacity-20 text-foreground w-full h-auto">
            {points.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r={svgOptions.radius} fill={svgOptions.color} />
            ))}
        </svg>
    )
}

const chartConfig = {
    inbound: {
        label: 'Inbound',
        color: 'hsl(var(--primary))',
    },
    outbound: {
        label: 'Outbound',
        color: 'hsl(var(--primary) / 0.5)',
    },
} satisfies ChartConfig

const chartData = [
    { month: 'May', inbound: 56, outbound: 224 },
    { month: 'June', inbound: 56, outbound: 224 },
    { month: 'January', inbound: 126, outbound: 252 },
    { month: 'February', inbound: 205, outbound: 410 },
    { month: 'March', inbound: 200, outbound: 126 },
    { month: 'April', inbound: 400, outbound: 800 },
]

const MonitoringChart = () => {
    return (
        <div className="w-full min-w-0">
            <ChartContainer className="h-[16rem] md:h-[18rem] w-full mt-4 md:mt-0 overflow-hidden" config={chartConfig}>
                <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 0,
                    right: 0,
                }}>
                <defs>
                    <linearGradient id="fillInbound" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-inbound)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-inbound)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillOutbound" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-outbound)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-outbound)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                <ChartTooltip active cursor={false} content={<ChartTooltipContent className="dark:bg-muted" />} />
                <Area strokeWidth={2} dataKey="outbound" type="stepBefore" fill="url(#fillOutbound)" stroke="var(--color-outbound)" stackId="a" />
                <Area strokeWidth={2} dataKey="inbound" type="stepBefore" fill="url(#fillInbound)" stroke="var(--color-inbound)" stackId="a" />
            </AreaChart>
        </ChartContainer>
        </div>
    )
}
