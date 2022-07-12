import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss'],
})
export class ArtworksComponent {
  @Input() artworks: any;

  constructor(public dialog: MatDialog) {}

  openDialog(art: any) {
    this.dialog.open(CategoryModalComponent, {
      data: art,
    });
  }
}
