import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteDialogComponent } from './delete-dialog.componet';


@NgModule({
  imports: [
    MatIconModule,
    FlexLayoutModule,
    // Mat
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  declarations: [DeleteDialogComponent],
  exports: [DeleteDialogComponent],
  entryComponents: [DeleteDialogComponent]
})
export class DeleteDialogModule {}
