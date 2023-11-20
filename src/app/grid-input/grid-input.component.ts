import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-input',
  templateUrl: './grid-input.component.html',
  styleUrls: ['./grid-input.component.css'],
})
export class GridInputComponent {
  rowCount: number = 3;
  columnCount: number = 3;
  rows: number[] = [];
  columns: number[] = [];
  gridData: any = {};
  gridGenerated: boolean = false;

  generateGrid() {
    this.rows = Array.from({ length: this.rowCount }, (_, i) => i);
    this.columns = Array.from({ length: this.columnCount }, (_, i) => i);
    this.gridData = {};

    for (let i = 0; i < this.rowCount; i++) {
      this.gridData[i] = {};
      for (let j = 0; j < this.columnCount; j++) {
        this.gridData[i][j] = '';
      }
    }

    this.gridGenerated = true;
  }
}
