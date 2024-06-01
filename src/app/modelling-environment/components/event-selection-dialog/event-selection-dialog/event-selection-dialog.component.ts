import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-event-selection-dialog',
  templateUrl: './event-selection-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  styleUrls: ['./event-selection-dialog.component.css']
})
export class EventSelectionDialogComponent {

  constructor(public dialogRef: MatDialogRef<EventSelectionDialogComponent>) {}

  selectEvent(eventType: string) {
    this.dialogRef.close(eventType);
  }
}
