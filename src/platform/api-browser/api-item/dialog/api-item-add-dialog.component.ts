import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Property } from '../../api-table/models';

@Component({
  selector: 'ext-api-item-add',
  templateUrl: './api-item-add-dialog.component.html'
})
export class ApiItemAddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApiItemAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public property: Property
  ) {
    console.log(property)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
