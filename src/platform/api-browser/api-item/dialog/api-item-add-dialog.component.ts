import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Property, RelationTypes } from '../../api-table/models';
import { ObjectWithLinks } from '../../..';
import { DialogData } from './models/dialogData';

@Component({
  selector: 'ext-api-item-add',
  templateUrl: './api-item-add-dialog.component.html'
})
export class ApiItemAddDialogComponent {
  public multiSelect: boolean = true;
  public selected: string[];

  constructor(
    public dialogRef: MatDialogRef<ApiItemAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.selected = data.response.map(d => d._links.self.href);
    if (data.property.relationShipType === RelationTypes.SINGLE) {
      this.multiSelect = false;
    }
  } // constructor()

  onOkay(): void {
    this.dialogRef.close(this.selected);
  }
}
