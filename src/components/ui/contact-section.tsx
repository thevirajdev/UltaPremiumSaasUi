"use client";

import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
	return (
		<section className="py-24" id="contact">
			<div className="container mx-auto px-4 md:px-6">
				<div className="mx-auto max-w-6xl">
					<ContactCard
						className="rounded-2xl bg-background/60 backdrop-blur-md border border-border/50 shadow-sm"
						title="Get in touch"
						description="Ready to transform your agency's clinical operations? Fill out the form below and our agency specialist team will reach out within 1 business day to schedule a personalized ClinicAI walkthrough."
						contactInfo={[
							{
								icon: MailIcon,
								label: 'Email',
								value: 'partners@clinicai.com',
							},
							{
								icon: PhoneIcon,
								label: 'Phone',
								value: '+1 (800) 555-0199',
							},
							{
								icon: MapPinIcon,
								label: 'Headquarters',
								value: 'San Francisco, CA',
								className: 'col-span-2 md:col-span-1 lg:col-span-2',
							}
						]}
					>
						<form action="" className="w-full space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-2">
									<Label>First Name</Label>
									<Input type="text" placeholder="Jane" className="bg-background/50" />
								</div>
								<div className="flex flex-col gap-2">
									<Label>Last Name</Label>
									<Input type="text" placeholder="Doe" className="bg-background/50" />
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<Label>Work Email</Label>
								<Input type="email" placeholder="jane@agency.com" className="bg-background/50" />
							</div>
							<div className="flex flex-col gap-2">
								<Label>Phone (Optional)</Label>
								<Input type="tel" placeholder="+1 (555) 000-0000" className="bg-background/50" />
							</div>
							<div className="flex flex-col gap-2">
								<Label>How can we help?</Label>
								<Textarea placeholder="Tell us about your agency's clinical needs..." className="bg-background/50 min-h-[100px]" />
							</div>
							<Button className="w-full mt-2 h-11" type="button">
								Request Demo
							</Button>
						</form>
					</ContactCard>
				</div>
			</div>
		</section>
	);
}
