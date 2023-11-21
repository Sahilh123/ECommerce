import { Component } from '@angular/core';

@Component({
  selector: 'app-grid-input',
  templateUrl: './grid-input.component.html',
  styleUrls: ['./grid-input.component.css'],
})
export class GridInputComponent {
  rowCount: number = 0; // Number of rows in the grid
  columnCount: number = 0; // Number of columns in the grid
  rows: number[] = []; // Array to store row indices
  columns: number[] = []; // Array to store column indices
  gridData: any = {}; // Object to store grid data
  gridGenerated: boolean = false; // Flag to track if the grid is generated

  // Function to generate the grid based on rowCount and columnCount
  generateGrid() {
    // Generate arrays for rows and columns based on rowCount and columnCount
    this.rows = Array.from({ length: this.rowCount }, (_, i) => i);
    this.columns = Array.from({ length: this.columnCount }, (_, i) => i);

    // Initialize gridData as an empty object
    this.gridData = {};

    // Loop through each row and column to initialize gridData with empty strings
    for (let i = 0; i < this.rowCount; i++) {
      this.gridData[i] = {};
      for (let j = 0; j < this.columnCount; j++) {
        this.gridData[i][j] = ''; // Set each cell value as an empty string
      }
    }

    this.gridGenerated = true; // Set the flag to indicate that the grid is generated
  }
}
