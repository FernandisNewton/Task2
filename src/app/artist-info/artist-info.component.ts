import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss'],
})
export class ArtistInfoComponent {
  @Input() artistInfo: any;
  constructor() {}
}
