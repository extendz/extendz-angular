import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ext-api-item-add',
  templateUrl: './api-item-add-dialog.component.html'
})
export class ApiItemAddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApiItemAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
