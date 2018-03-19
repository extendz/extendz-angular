import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { ExtendzQrGeneratorComponent } from './extendz-qr-generator.component';
import { QRGeneratorComponent } from './qr-generator/qr-generator.component';

@NgModule({
  imports: [CommonModule, MatInputModule, FormsModule],
  declarations: [ExtendzQrGeneratorComponent, QRGeneratorComponent],
  exports: [ExtendzQrGeneratorComponent]
})
export class ExtendzQrGeneratorModule {}
