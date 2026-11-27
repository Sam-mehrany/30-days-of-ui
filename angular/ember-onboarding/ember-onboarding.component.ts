import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

interface Tilt {
  x: string | null;
  y: string | null;
}

interface Slide {
  shards: string[];
  tilt: Tilt;
  solid?: boolean;
  label: string;
  num: string;
  small?: string;
  pan: string;
  title: string;
  body: string;
}

const AUTO_ADVANCE_MS = 4500;

@Component({
  selector: 'app-ember-onboarding',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './ember-onboarding.component.html',
  styleUrls: ['./ember-onboarding.component.css'],
})
export class EmberOnboardingComponent implements OnInit, OnDestroy {
  readonly slides: Slide[] = [
    {
      shards: ['s1', 's2', 's3', 's4'],
      tilt: { x: null, y: null },
      label: 'Balance', num: '$12,480', small: '.50', pan: '•••• 4821',
      title: 'Your money, glowing',
      body: 'See every account in one place, updated the moment anything moves.',
    },
    {
      shards: ['s2', 's3', 's1'],
      tilt: { x: null, y: '10deg' },
      label: 'Saved this month', num: '$842', small: '.10', pan: 'Round-ups on',
      title: 'Savings on autopilot',
      body: 'Every purchase rounds up to the next dollar and quietly stacks the rest.',
    },
    {
      shards: ['s4', 's1', 's2'],
      tilt: { x: '4deg', y: '-4deg' },
      solid: true,
      label: 'Spend limit', num: '$2,000', pan: '•••• 4821',
      title: 'Lock it with a tap',
      body: 'Freeze, unfreeze and set limits instantly, right from your lock screen.',
    },
  ];
  readonly last = this.slides.length - 1;

  /** Current slide (named `current` so it never shadows *ngFor's `index`). */
  current = 0;
  private timer?: ReturnType<typeof setTimeout>;
  private x0: number | null = null;

  get isLast(): boolean {
    return this.current === this.last;
  }

  ngOnInit(): void {
    this.go(0);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  go(n: number): void {
    const k = Math.max(0, Math.min(this.last, n));
    this.current = k;
    clearTimeout(this.timer);
    if (k < this.last) this.timer = setTimeout(() => this.go(k + 1), AUTO_ADVANCE_MS);
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.go(this.current + 1);
    if (e.key === 'ArrowLeft') this.go(this.current - 1);
  }

  onPointerDown(e: PointerEvent): void {
    this.x0 = e.clientX;
  }

  onPointerUp(e: PointerEvent): void {
    if (this.x0 === null) return;
    const dx = e.clientX - this.x0;
    this.x0 = null;
    if (Math.abs(dx) > 40) this.go(this.current + (dx < 0 ? 1 : -1));
  }

  // subtle tilt follows the pointer
  onPointerMove(e: PointerEvent): void {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.slides[this.current].tilt = {
      y: ((e.clientX - r.left) / r.width - 0.5) * 22 + 'deg',
      x: ((e.clientY - r.top) / r.height - 0.5) * -16 + 'deg',
    };
  }
}
