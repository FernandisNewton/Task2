import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {} from 'rxjs';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { ArtsyService } from '../services/artsy.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private artsyService: ArtsyService) {}

  debounce = (func: any, delay: any) => {
    let debounceTimer: any;

    return () => {
      const context = this;
      const args = HomeComponent.arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  artistInfo: any[] = [];
  artistName?: string;
  isLoading?: boolean;
  artistBio?: any;
  showTabs: boolean = false;

  setName(event: any) {
   // this.artistName = event.target.value;
    this.debounce(this.searchArtists2(event.target.value),500);
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

  searchArtists2(name:any) {
     
    this.isLoading = true;
    this.artsyService.getArtists(name).subscribe(
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
