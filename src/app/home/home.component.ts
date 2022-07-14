import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { catchError, debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';
import { ArtsyService } from '../services/artsy.service';
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

  ngAfterViewInit() {
    fromEvent(this.inputElement?.nativeElement, 'keyup')
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((input: any) => {
        this.isLoading = true;
        this.artistName = input.target.value;
        this.searchArtists();
      });
  }

  resetData(): void {
    
    this.artistInfo = [];
    this.artistBio = null;
    this.showTabs = false;
    this.isLoading = false;
  }

  clearSearchBox(){
    this.inputElement.nativeElement.value = ''
    this.artistName = "";
    this.resetData();
  }
  searchArtists() {
    this.resetData();
    this.isLoading = true;
    this.artsyService
      .getArtists(this.artistName)
      .pipe(
        catchError((err, caught) => err),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (results: any) => {
          this.artistInfo = results;
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
