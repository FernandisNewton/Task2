import { Component, OnInit } from '@angular/core';
import { ArtsyService } from '../services/artsy.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private artsyService: ArtsyService) {}

  ngOnInit(): void {}
  artistInfo: any;
  searchArtists(event: any) {
    event.preventDefault();
    console.log('service');

    this.artistInfo = this.artsyService.getArtists();
    console.log(this.artistInfo);
  }
}
