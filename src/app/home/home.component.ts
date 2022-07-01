import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  debounceTime,
  fromEvent,
  Observable,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { ArtsyService } from '../services/artsy.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchInput') inputElement?: ElementRef;
  constructor(private artsyService: ArtsyService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.inputElement?.nativeElement, 'keyup')
      .pipe(filter(Boolean), debounceTime(500), distinctUntilChanged())
      .subscribe((value: any) => {
        this.isLoading = true;
        this.artsyService.getArtists(value.target.value).subscribe({
          next: (results: any) => {
            this.artistInfo = results;
          },
          error: (error: any) => {
            console.log(error);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      });
  }
  artistInfo: any[] = [];
  artistName?: string;
  isLoading?: boolean;
  artistBio?: any;
  showTabs: boolean = false;

  setName(event: any) {
    this.artistName = event.target.value;
  }

  searchArtists(event: any) {
    event.preventDefault();
    this.isLoading = true;
    this.artsyService.getArtists(this.artistName).subscribe(
      (results: any) => {
        this.artistInfo = results;
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onCardClick(artist: any) {
    this.showTabs = true;
    this.artsyService.getArtistInfo(artist).subscribe((value: any) => {
      this.artistBio = value;
    });
  }
}
