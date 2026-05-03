'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const links = [
		{
			label: 'Features',
			href: '#',
		},
		{
			label: 'Pricing',
			href: '#',
		},
		{
			label: 'About',
			href: '#',
		},
	];

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-[100] mx-auto w-full max-w-7xl border-b border-transparent md:rounded-full md:border md:transition-all md:ease-out',
				{
					'bg-background/60 border-border/50 backdrop-blur-xl top-0 md:top-4 md:max-w-6xl md:shadow-2xl dark:bg-white/5':
						scrolled && !open,
					'bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-6 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-4': scrolled,
					},
				)}
			>
				<div className="flex items-center gap-2">
					<span className="text-xl font-bold tracking-tight text-foreground">
						Clinic<span className="text-primary">AI</span>
					</span>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<a key={i} className={cn(buttonVariants({ variant: 'ghost' }), "text-muted-foreground hover:text-foreground transition-colors")} href={link.href}>
							{link.label}
						</a>
					))}
					<div className="h-4 w-px bg-border mx-2" />
					{mounted && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className="hover:bg-accent transition-colors"
						>
							{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
						</Button>
					)}
					<Button variant="ghost" className="text-muted-foreground hover:text-foreground">Sign In</Button>
					<Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
						Get Started
					</Button>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					{mounted && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						>
							{theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
						</Button>
					)}
					<Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</div>
			</nav>

			<div
				className={cn(
					'bg-background/95 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden backdrop-blur-xl',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-6',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<a
								key={link.label}
								className={cn(buttonVariants({
									variant: 'ghost',
									className: 'justify-start text-lg',
								}))}
								href={link.href}
							>
								{link.label}
							</a>
						))}
					</div>
					<div className="flex flex-col gap-4">
						<Button variant="outline" className="w-full py-6 text-lg">
							Sign In
						</Button>
						<Button className="w-full py-6 text-lg shadow-xl">Get Started</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
