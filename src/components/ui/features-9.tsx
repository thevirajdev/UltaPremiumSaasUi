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
                            Real time location tracking
                        </span>

                        <p className="mt-4 md:mt-8 text-xl md:text-2xl font-semibold tracking-tight">Advanced tracking system, Instantly locate all your assets.</p>
                    </div>

                    <div aria-hidden className="relative">
                        <div className="absolute inset-0 z-10 m-auto size-fit">
                            <div className="rounded-[--radius] bg-background z-[1] dark:bg-muted relative flex max-w-[85vw] text-center w-fit items-center gap-1 md:gap-2 border px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium shadow-md shadow-black/5 overflow-hidden">
                                <span className="text-sm md:text-lg shrink-0">🇨🇩</span> <span className="truncate">Last connection from DR Congo</span>
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
                            Email and web support
                        </span>

                        <p className="my-4 md:my-8 text-xl md:text-2xl font-semibold tracking-tight">Reach out via email or web for any assistance you need.</p>
                    </div>
                    <div aria-hidden className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex justify-center items-center size-5 rounded-full border">
                                    <span className="size-3 rounded-full bg-primary"/>
                                </span>
                                <span className="text-muted-foreground text-xs">Sat 22 Feb</span>
                            </div>
                            <div className="rounded-[--radius] bg-background mt-1.5 w-4/5 md:w-3/5 border p-3 text-xs md:text-sm shadow-sm leading-relaxed">Hey, I'm having trouble with my account.</div>
                        </div>

                        <div>
                            <div className="rounded-[--radius] mb-1 ml-auto w-4/5 md:w-3/5 bg-primary text-primary-foreground p-3 text-xs md:text-sm shadow-sm leading-relaxed">Molestiae numquam debitis et ullam distinctio provident nobis repudiandae deleniti necessitatibus.</div>
                            <span className="text-muted-foreground block text-right text-xs">Now</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-y p-6 md:p-8 bg-zinc-50/30 dark:bg-transparent">
                    <p className="text-center text-3xl font-semibold md:text-4xl lg:text-6xl tracking-tighter">99.99% Uptime</p>
                </div>
                <div className="relative col-span-full w-full min-w-0 pb-0 md:pb-8 flex flex-col md:block">
                    <div className="relative md:absolute z-10 w-full max-w-lg px-6 pt-6 md:px-8 md:pt-8">
                        <span className="text-muted-foreground flex items-center gap-2 text-sm md:text-base">
                            <Activity className="size-4" />
                            Activity feed
                        </span>

                        <p className="mt-4 mb-4 md:mb-8 text-xl md:text-2xl font-semibold tracking-tight">
                            Monitor your application's activity in real-time. <span className="text-muted-foreground"> Instantly identify and resolve issues.</span>
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
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--primary))',
    },
    mobile: {
        label: 'Mobile',
        color: 'hsl(var(--primary) / 0.5)',
    },
} satisfies ChartConfig

const chartData = [
    { month: 'May', desktop: 56, mobile: 224 },
    { month: 'June', desktop: 56, mobile: 224 },
    { month: 'January', desktop: 126, mobile: 252 },
    { month: 'February', desktop: 205, mobile: 410 },
    { month: 'March', desktop: 200, mobile: 126 },
    { month: 'April', desktop: 400, mobile: 800 },
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
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-desktop)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-mobile)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-mobile)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                <ChartTooltip active cursor={false} content={<ChartTooltipContent className="dark:bg-muted" />} />
                <Area strokeWidth={2} dataKey="mobile" type="stepBefore" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
                <Area strokeWidth={2} dataKey="desktop" type="stepBefore" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" />
            </AreaChart>
        </ChartContainer>
        </div>
    )
}
