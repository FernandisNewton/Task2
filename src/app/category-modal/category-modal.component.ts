import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ArtsyService } from '../services/artsy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private artsyService: ArtsyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  genesData?: any[];

  ngOnInit(): void {
    this.artsyService
      .getGenes(this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        this.genesData = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(1);
    this.destroy$.complete();
  }
}
