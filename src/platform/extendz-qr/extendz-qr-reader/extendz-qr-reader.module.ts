import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendzQrReaderComponent } from './extendz-qr-reader.component';
import { ZXingScannerModule } from './zxing-scanner/zxing-scanner.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ZXingScannerComponent } from './zxing-scanner/zxing-scanner.component';

@NgModule({
  imports: [CommonModule, ZXingScannerModule.forRoot(), FormsModule, MatSelectModule],
  declarations: [ExtendzQrReaderComponent],
  exports: [ExtendzQrReaderComponent]
})
export class ExtendzQrReaderModule {}
