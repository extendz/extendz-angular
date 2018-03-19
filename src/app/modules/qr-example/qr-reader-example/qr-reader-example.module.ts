import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrreaderexampleComponent } from './qrreaderexample.component';
import { QrReaderExampleModuleRoutingModule } from './qr-reader-example-module-routing.module';
import { ExtendzQrReaderModule } from '../../../../platform/extendz-qr';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, QrReaderExampleModuleRoutingModule, ExtendzQrReaderModule, MatTabsModule],
  declarations: [QrreaderexampleComponent]
})
export class QrReaderExampleModule {}
