import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, PLATFORM_ID, ViewChild, inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/* ---- live moon phase -> spring tide ---- */
const SYN = 29.530588853, REF = Date.UTC(2000, 0, 6, 18, 14) / 864e5; // known new moon
const NAMES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];

/* ---- kingfisher flight plan ---- */
const PLAN = [
  { w: 150, dur: 13, delay: 0,   y: .46, drift: -.05 },
  { w: 110, dur: 15, delay: 2.8, y: .54, drift: -.04 },
  { w: 180, dur: 12, delay: 6.2, y: .42, drift: -.06 },
  { w: 90,  dur: 17, delay: 9.0, y: .58, drift: -.03 },
];

interface Star { x: number; y: number; r: number; p: number; s: number; }

@Component({
  selector: 'app-footer-halcyon',
  standalone: true,
  templateUrl: './footer-halcyon.component.html',
  styleUrls: ['./footer-halcyon.component.css'],
})
export class FooterHalcyonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('root', { static: true }) rootRef!: ElementRef<HTMLElement>;
  @ViewChild('stars', { static: true }) starsRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('moon', { static: true }) moonRef!: ElementRef<HTMLCanvasElement>;

  tide = 'Reading the moon…';
  birds: string[] = [];
  sent = false;
  readonly year = new Date().getFullYear();

  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private cleanup: () => void = () => {};

  onSubmit(e: Event): void {
    e.preventDefault();
    this.sent = true;
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    const root = this.rootRef.nativeElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const age = (((Date.now() / 864e5 - REF) % SYN) + SYN) % SYN;
    this.tide = this.tideText(age);
    this.drawMoon(this.moonRef.nativeElement.getContext('2d')!, age);
    this.placeBirds(root);
    this.cdr.detectChanges();

    /* ---- twinkling stars + rare shooting star ---- */
    const cv = this.starsRef.nativeElement, cx = cv.getContext('2d')!;
    let W = 0, H = 0, stars: Star[] = [], raf = 0;
    let shoot: { x: number; y: number; l: number } | null = null;
    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = root.clientWidth * d; H = cv.height = root.clientHeight * d;
      cx.setTransform(1, 0, 0, 1, 0, 0);
      const n = Math.round(root.clientWidth * root.clientHeight / 5200);
      stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H * .62, r: (Math.random() * 1.1 + .25) * d, p: Math.random() * 6.28, s: .4 + Math.random() * 1.6 }));
    };
    const frame = (t: number) => {
      cx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = .25 + .75 * Math.pow((Math.sin(s.p + t / 1000 * s.s) + 1) / 2, 3);
        cx.globalAlpha = a; cx.fillStyle = '#f4ecdc';
        cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.283); cx.fill();
      }
      if (!shoot && Math.random() < .0025) shoot = { x: W * (.35 + Math.random() * .5), y: H * (.05 + Math.random() * .2), l: 0 };
      if (shoot) {
        shoot.l += 0.022; const L = shoot.l, len = W * .12;
        const x = shoot.x - L * W * .25, y = shoot.y + L * W * .09;
        const g = cx.createLinearGradient(x, y, x + len, y - len * .36);
        g.addColorStop(0, 'rgba(255,245,225,.9)'); g.addColorStop(1, 'rgba(255,245,225,0)');
        cx.globalAlpha = Math.sin(Math.min(L, 1) * Math.PI); cx.strokeStyle = g; cx.lineWidth = 1.4;
        cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + len, y - len * .36); cx.stroke();
        if (L >= 1) shoot = null;
      }
      cx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      size();
      if (reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } // redraw the still sky
      this.zone.run(() => this.placeBirds(root));
    };

    /* ---- gentle parallax ---- */
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      root.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5) * -18 + 'px');
      root.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5) * -10 + 'px');
    };

    // Animation loop and listeners run outside Angular so they don't trigger change detection every frame.
    this.zone.runOutsideAngular(() => {
      size(); raf = requestAnimationFrame(frame);
      window.addEventListener('resize', onResize);
      root.addEventListener('pointermove', onMove);
    });

    this.cleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      root.removeEventListener('pointermove', onMove);
    };
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private tideText(age: number): string {
    const frac = (1 - Math.cos(2 * Math.PI * age / SYN)) / 2;
    const name = NAMES[Math.floor(((age / SYN) * 8) + 0.5) % 8];
    const toNew = SYN - age, toFull = (SYN / 2 - age + SYN) % SYN;
    const days = Math.round(Math.min(toNew, toFull));
    return `${name}, ${Math.round(frac * 100)}% lit · ${days <= 0 ? 'spring tide tonight' : `spring tide in ${days} day${days === 1 ? '' : 's'}`}`;
  }

  private drawMoon(mc: CanvasRenderingContext2D, age: number): void {
    const r = 12, c = 14; mc.clearRect(0, 0, 28, 28);
    mc.fillStyle = '#2a2925'; mc.beginPath(); mc.arc(c, c, r, 0, 7); mc.fill();
    mc.save(); mc.beginPath(); mc.arc(c, c, r, 0, 7); mc.clip();
    mc.fillStyle = '#efe7d8';
    const waxing = age < SYN / 2, k = Math.cos(2 * Math.PI * age / SYN); // 1 new .. -1 full
    mc.beginPath();
    mc.arc(c, c, r, -Math.PI / 2, Math.PI / 2, !waxing);
    mc.ellipse(c, c, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, (k > 0) ? waxing : !waxing);
    mc.fill(); mc.restore();
  }

  private placeBirds(root: HTMLElement): void {
    const Wd = root.clientWidth, Ht = root.clientHeight, s = Math.min(1, Wd / 1400);
    this.birds = PLAN.map((b) => {
      const w = b.w * Math.max(.6, s);
      return `--w:${w}px;--dur:${b.dur}s;--delay:${b.delay}s;` +
        `--x0:${-w - 40}px;--y0:${Ht * b.y}px;` +
        `--x1:${Wd * .45}px;--y1:${Ht * (b.y + b.drift)}px;` +
        `--x2:${Wd + 60}px;--y2:${Ht * (b.y + b.drift * 1.8)}px;`;
    });
  }
}
