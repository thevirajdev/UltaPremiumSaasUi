import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'

export function Features() {
    return (
        <section className="w-full overflow-hidden py-12 md:py-16">
            <div className="mx-auto w-full max-w-5xl space-y-8 px-4 md:px-6 md:space-y-12">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold lg:text-5xl tracking-tight">Built for Modern Healthcare</h2>
                    <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground">AIVoice OS provides a unified voice interface for your clinic, integrating directly with your existing software and patient databases.</p>
                </div>
                <div className="relative mx-0 rounded-3xl p-0 sm:p-3 md:-mx-12 lg:col-span-3">
                    <div className="[perspective:800px]">
                        <div className="[transform:skewY(-2deg)skewX(-2deg)rotateX(6deg)]">
                            <div className="aspect-[88/36] relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                                <div className="[background-image:radial-gradient(var(--tw-gradient-stops,at_75%_25%))] to-background z-1 -inset-[4.25rem] absolute from-transparent to-75%"></div>
                                <img 
                                    src="https://tailark.com/_next/image?url=%2Fmail-upper.png&w=3840&q=75" 
                                    className="absolute inset-0 z-10 w-full h-full object-cover" 
                                    alt="features illustration" 
                                />
                                <img 
                                    src="https://tailark.com/_next/image?url=%2Fmail-back.png&w=3840&q=75" 
                                    className="hidden dark:block w-full h-full object-cover" 
                                    alt="features illustration dark" 
                                />
                                <img 
                                    src="https://tailark.com/_next/image?url=%2Fmail-back-light.png&w=3840&q=75" 
                                    className="dark:hidden w-full h-full object-cover" 
                                    alt="features illustration light" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative mx-auto grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4 pt-4 md:pt-0">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4 text-blue-500" />
                            <h3 className="text-sm font-medium">Latency-Free</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">Voice responses in under 500ms for a natural, human conversation experience.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4 text-indigo-500" />
                            <h3 className="text-sm font-medium">EMR Integration</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">Syncs appointment data and patient records in real-time across your facility.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lock className="size-4 text-violet-500" />
                            <h3 className="text-sm font-medium">HIPAA Secure</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">Enterprise-grade encryption and BAA-protected data handling for medical privacy.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-amber-500" />
                            <h3 className="text-sm font-medium">Agent Config</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">Configure AI models, voice profiles, and transcribers to match your clinic's specialty.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
