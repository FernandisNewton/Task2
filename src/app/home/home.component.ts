import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { ArtsyService } from '../services/artsy.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private artsyService: ArtsyService) {}
  artistInfo?: any[];
  artistName?: string;
  isLoading?: boolean;
  artistBio?: any;
  showTabs:boolean = false;

  ngOnInit(): void {}

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
