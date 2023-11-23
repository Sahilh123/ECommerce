import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  @Input() row: any = 0;
  @Input() column: any = 0;
  @Input() gridData: any = {};
}
