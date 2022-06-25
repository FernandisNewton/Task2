import { Component, Inject, OnInit } from '@angular/core';
import { ArtsyService } from '../services/artsy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  constructor(
    private artsyService: ArtsyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  genesData?: any[];
  ngOnInit(): void {
    this.artsyService.getGenes(this.data).subscribe((value: any) => {
      this.genesData = value;
    });
  }
}
