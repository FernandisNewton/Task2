import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { ArtsyService } from '../services/artsy.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.scss']
})
export class ArtworksComponent implements OnInit {
 @Input() artworks:any;
 
  constructor(private artsyService: ArtsyService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openDialog(art:any) {
    const dialogRef = this.dialog.open(CategoryModalComponent,{
      data:art
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
}
}
