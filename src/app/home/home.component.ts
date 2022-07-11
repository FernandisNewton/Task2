import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  debounceTime,
  fromEvent,
  Subject,
  takeUntil
} from 'rxjs';
import { ArtsyService } from '../services/artsy.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy{
  @ViewChild('searchInput') inputElement?: ElementRef;

  private destroy$ = new Subject();

  constructor(private artsyService: ArtsyService) {}
  artistInfo: any[] = [];
  artistName?: string;
  isLoading?: boolean;
  artistBio?: any;
  showTabs: boolean = false;

  ngAfterViewInit() {
    fromEvent(this.inputElement?.nativeElement, 'keyup')
      .pipe(debounceTime(500),takeUntil(this.destroy$))
      .subscribe((input: any) => {
        this.isLoading = true;
        this.artistName = input.target.value;
        this.searchArtists();
      });
  }


  
  searchArtists() {
    this.isLoading = true;
    this.artsyService.getArtists(this.artistName).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
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
    this.showTabs = true;
    this.artsyService.getArtistInfo(artist).pipe(
      takeUntil(this.destroy$)
    ).subscribe((value: any) => {
      this.artistBio = value;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(1);
    this.destroy$.complete();
  }
}
