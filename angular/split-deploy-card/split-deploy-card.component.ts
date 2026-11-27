import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

type ViewId = 'overview' | 'builds' | 'logs';

interface PaneView {
  lt: string;
  lp: string;
  l: [string, string][];
  dt: string;
  dp: string;
}

@Component({
  selector: 'app-split-deploy-card',
  standalone: true,
  templateUrl: './split-deploy-card.component.html',
  styleUrls: ['./split-deploy-card.component.css'],
})
export class SplitDeployCardComponent implements AfterViewInit, OnDestroy {
  readonly tabs: { id: ViewId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'builds', label: 'Builds' },
    { id: 'logs', label: 'Logs' },
  ];

  readonly views: Record<ViewId, PaneView> = {
    overview: {
      lt: 'feat/checkout-redesign',
      lp: 'Built from your branch with its own URL, so reviewers can click through before anything merges.',
      l: [['Commit', 'a91c4e2'], ['Build time', '38s'], ['Reviewers', '2 approved']],
      dt: 'Production',
      dp: 'Live on halcyon.studio across 18 edge regions, with instant rollback to any earlier build.',
    },
    builds: {
      lt: 'Last 24 hours',
      lp: 'Fourteen builds, one failed on a type error and was fixed in the next push.',
      l: [['Succeeded', '13'], ['Median time', '41s'], ['Cache hit', '92%']],
      dt: 'Production build',
      dp: 'Promoted from preview a91c4e1 after review. Previous build kept warm for rollback.',
    },
    logs: {
      lt: 'Runtime logs',
      lp: 'Streaming from every region. Filter by route, status or request ID.',
      l: [['Requests / min', '2,310'], ['Errors', '0.02%'], ['Cold starts', '3']],
      dt: 'Live tail',
      dp: 'The last few lines from production, newest at the bottom.',
    },
  };

  readonly logLines: [string, string][] = [
    ['200', ' GET /            12ms  yul1'],
    ['200', ' GET /journal     31ms  iad1'],
    ['200', ' POST /api/sub    84ms  yyz1'],
    ['304', ' GET /og.png       4ms  cdg1'],
  ];

  /** Line break between log lines inside the <pre>. */
  readonly nl = '\n';

  active: ViewId = 'overview';
  restarting = false;
  ago = 'Updated 2m ago';

  @ViewChild('thumb') private thumb?: ElementRef<HTMLElement>;
  @ViewChildren('tab') private tabEls?: QueryList<ElementRef<HTMLButtonElement>>;

  private raf = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  get view(): PaneView {
    return this.views[this.active];
  }

  get isLog(): boolean {
    return this.active === 'logs';
  }

  ngAfterViewInit(): void {
    this.raf = requestAnimationFrame(() => this.moveThumb());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    if (this.timer) clearTimeout(this.timer);
  }

  @HostListener('window:resize')
  moveThumb(): void {
    const i = this.tabs.findIndex((t) => t.id === this.active);
    const b = this.tabEls?.get(i)?.nativeElement;
    const thumb = this.thumb?.nativeElement;
    if (!b || !thumb) return;
    thumb.style.width = b.offsetWidth + 'px';
    thumb.style.transform = `translateX(${b.offsetLeft}px)`;
  }

  select(id: ViewId): void {
    this.active = id;
    this.moveThumb();
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = this.tabs.findIndex((t) => t.id === this.active);
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + this.tabs.length) % this.tabs.length;
    this.tabEls?.get(n)?.nativeElement.focus();
    this.select(this.tabs[n].id);
  }

  restart(): void {
    this.restarting = true;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.restarting = false;
      this.ago = 'Updated just now';
      this.timer = null;
    }, 2200);
  }
}
