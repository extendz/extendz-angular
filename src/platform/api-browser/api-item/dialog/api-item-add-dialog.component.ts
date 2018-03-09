import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Property, RelationTypes } from '../../api-table/models';
import { ObjectWithLinks } from '../../..';

@Component({
  selector: 'ext-api-item-add',
  templateUrl: './api-item-add-dialog.component.html'
})
export class ApiItemAddDialogComponent {
  public multSelect: boolean = true;
  public selected: ObjectWithLinks[];

  constructor(
    public dialogRef: MatDialogRef<ApiItemAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public property: Property
  ) {
    if (property.relation === 'onetoone') {
      this.multSelect = false;
    }
  } // constructor()

  onOkay(): void {
    this.dialogRef.close(this.selected);
  }
}
