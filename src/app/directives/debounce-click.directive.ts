import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Directive({
  selector: '[appDebounceClick]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Output() debounceClick = new EventEmitter();
  @Input() debounceTime = 700;

  private clicks = new Subject();
  private destroy$ = new Subject();
  
  ngOnInit() {
    this.clicks
      .pipe(debounceTime(this.debounceTime), takeUntil(this.destroy$))
      .subscribe((debouncedEvent) => this.debounceClick.emit(debouncedEvent));
  }
  
  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnDestroy() {
    this.destroy$.next(1);
    this.destroy$.complete();
  }
}
