import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { catchError, debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { ArtsyService } from '../../services/artsy.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  @ViewChild('searchInput')
  inputElement!: ElementRef;

  private destroy$ = new Subject();

  constructor(private artsyService: ArtsyService) {}
  artistInfo: any[] = [];
  artistName?: string;
  isLoading?: boolean;
  artistBio?: any = null;
  showTabs: boolean = false;
  currentPageIndex: number = 0;
  pages: any[] = [];
  pageSize: number = 4;

  ngAfterViewInit() {
    fromEvent(this.inputElement?.nativeElement, 'keyup')
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((input: any) => {
        this.isLoading = true;
        this.artistName = input.target.value;
        this.searchArtists();
      });
  }

  calculateNumberOfPages(): void {
    let numberOfPages = Math.ceil(this.artistInfo.length / this.pageSize);
    this.pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      this.pages.push({ pageIndex: i });
    }
    this.currentPageIndex = 0;
  }

  onPageIndexClicked(pageIndex: number) {
    this.currentPageIndex = pageIndex;
  }

  resetData(): void {
    this.artistInfo = [];
    this.artistBio = null;
    this.showTabs = false;
    this.isLoading = false;
    this.pages = [];
  }

  clearSearchBox() {
    this.inputElement.nativeElement.value = '';
    this.artistName = '';
    this.resetData();
  }
  searchArtists() {
    if (this.artistName) {
      this.resetData();
      this.isLoading = true;
      this.artsyService
        .getArtists(this.artistName)
        .pipe(
          catchError((err) => err),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (results: any) => {
            this.artistInfo = results;
            this.calculateNumberOfPages();
          },
          error: (error: any) => {
            console.log(error);
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  onCardClick(artist: any) {
    this.artistBio = null;
    this.showTabs = true;
    this.artsyService
      .getArtistInfo(artist)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.artistBio = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(1);
    this.destroy$.complete();
  }
}
