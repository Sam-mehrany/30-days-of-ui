import { Component, ElementRef, OnDestroy, ViewChild, computed, signal } from '@angular/core';

/* Playback "saves" time: the violet wedge and hand sweep up to SAVED_MAX of a one-hour dial. */
const TOTAL = 32 * 60 + 42; // recording length in seconds (32:42)
const SAVED_MAX = 55;       // minutes saved by skipping the full meeting
const SPEED = 60;           // 60x speed demo
const N = 46;               // waveform bars

@Component({
  selector: 'app-time-back-tile',
  standalone: true,
  templateUrl: './time-back-tile.component.html',
  styleUrls: ['./time-back-tile.component.css'],
})
export class TimeBackTileComponent implements OnDestroy {
  @ViewChild('wave') private wave!: ElementRef<HTMLDivElement>;

  readonly ticks = Array.from({ length: 60 }, (_, k) => k);
  readonly bars = Array.from({ length: N }, (_, k) =>
    Math.min(100, 18 + 70 * Math.abs(Math.sin(k * 1.7) * Math.cos(k * 0.43)) + (k % 7 === 0 ? 12 : 0)),
  );
  readonly dust = Array.from({ length: 16 }, () => ({
    left: 10 + Math.random() * 80 + '%',
    top: 15 + Math.random() * 75 + '%',
    delay: -Math.random() * 3 + 's',
  }));

  readonly pos = signal(TOTAL * 0.27); // start with a visible wedge, like the reference
  readonly playing = signal(false);

  private readonly p = computed(() => this.pos() / TOTAL);
  readonly on = computed(() => Math.round(this.p() * N));
  readonly mins = computed(() => Math.round(this.p() * SAVED_MAX));
  readonly deg = computed(() => (this.mins() / 60) * 360);
  readonly time = computed(() => {
    const s = TOTAL - this.pos();
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  });

  private raf = 0;
  private last = 0;

  toggle(): void {
    this.setPlaying(!this.playing());
  }

  scrub(e: MouseEvent): void {
    const r = this.wave.nativeElement.getBoundingClientRect();
    this.pos.set(Math.max(0, Math.min(TOTAL, ((e.clientX - r.left) / r.width) * TOTAL)));
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }

  private setPlaying(value: boolean): void {
    this.playing.set(value);
    this.last = 0;
    cancelAnimationFrame(this.raf);
    if (value) {
      if (this.pos() >= TOTAL) this.pos.set(0);
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  private readonly tick = (t: number): void => {
    if (!this.playing()) return;
    if (this.last) this.pos.update((p) => Math.min(TOTAL, p + ((t - this.last) / 1000) * SPEED));
    this.last = t;
    if (this.pos() >= TOTAL) {
      this.setPlaying(false);
      return;
    }
    this.raf = requestAnimationFrame(this.tick);
  };
}
