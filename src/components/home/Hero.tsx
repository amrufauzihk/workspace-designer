import {ArrowRight, Eye, Receipt, Sparkles} from 'lucide-react';
import {formatIDR, getLineItems, getMonthlySubtotal} from '@/lib/pricing';
import {getWorkspaceTitle} from '@/lib/workspace-utils';
import type {WorkspaceConfiguration} from '@/types/workspace';
import {WorkspaceScene} from '../workspace/illustrations/WorkspaceScene';

const EXAMPLE_SETUP: WorkspaceConfiguration = {
	deskId: 'studio-desk',
	chairId: 'ergonomic-chair',
	monitorId: 'dual-monitor',
	monitorQuantity: 1,
	accessoryIds: ['desk-lamp', 'indoor-plant', 'mechanical-keyboard', 'mouse'],
	duration: 3,
	scene: 'ubud'
};

const exampleMonthly = getMonthlySubtotal(getLineItems(EXAMPLE_SETUP));

const HIGHLIGHTS = [
	{icon: Eye, label: 'Live room preview'},
	{icon: Receipt, label: 'Transparent estimates'},
	{icon: Sparkles, label: '1 to 12 month rentals'}
];

export function Hero() {
	return (
		<section
			id="top"
			className="mx-auto w-full max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-16 lg:pt-20"
		>
			<div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
				<div className="lg:col-span-5">
					<h1 className="mt-6 font-display text-[3.1rem] leading-[0.98] tracking-tight text-ink sm:text-7xl">
						Design your space.
						<br />
						Rent your setup.
						<br />
						<em className="text-forest">Work from anywhere.</em>
					</h1>
					<p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
						Pick a desk, a chair and the details that make you productive. Watch your room come
						together, then send one simple rental inquiry.
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<a
							href="#studio"
							className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-6 text-sm font-medium text-white shadow-soft transition hover:bg-forest-deep"
						>
							Design your workspace
							<ArrowRight className="size-4" aria-hidden="true" />
						</a>
						<a
							href="#how-it-works"
							className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong bg-surface px-6 text-sm font-medium text-ink transition hover:border-ink"
						>
							How it works
						</a>
					</div>
					<ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
						{HIGHLIGHTS.map(({icon: Icon, label}) => (
							<li key={label} className="flex items-center gap-2">
								<Icon className="size-4 text-sage" aria-hidden="true" />
								{label}
							</li>
						))}
					</ul>
				</div>

				<figure className="relative lg:col-span-7">
					<div className="overflow-hidden rounded-3xl border border-line bg-sand shadow-lift">
						<WorkspaceScene
							configuration={EXAMPLE_SETUP}
							animated={false}
							className="block aspect-[3/2] w-full"
							label="Example workspace: studio desk, ergonomic chair, dual monitors, lamp, plant, keyboard and mouse"
						/>
					</div>
					<figcaption className="absolute -bottom-6 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface/95 p-4 shadow-soft backdrop-blur sm:left-6 sm:right-auto sm:min-w-[20rem]">
						<div>
							<p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
								Example setup
							</p>
							<p className="mt-0.5 text-sm font-semibold text-ink">
								{getWorkspaceTitle(EXAMPLE_SETUP)}
							</p>
						</div>
						<div className="text-right">
							<p className="text-sm font-semibold tabular-nums text-ink">
								{formatIDR(exampleMonthly)}
							</p>
							<p className="text-[11px] text-muted">/month · illustrative</p>
						</div>
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
