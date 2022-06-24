import { Component, Input, OnInit } from '@angular/core';
import { ArtsyService } from '../services/artsy.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {
 @Input() artworks:any;
  constructor(private artsyService: ArtsyService) { }

  ngOnInit(): void {
  }
  fetchGenes(art:any){
    this.artsyService.getGenes(art)
    
  }
}
