import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrgeneratorexampleComponent } from './qrgeneratorexample.component';
import { QrGeneratorExampleRoutingModule } from './qr-generator-example-routing.module';
import { ExtendzQrGeneratorModule } from '../../../../platform/extendz-qr';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, QrGeneratorExampleRoutingModule, MatTabsModule, ExtendzQrGeneratorModule],
  declarations: [QrgeneratorexampleComponent]
})
export class QrGeneratorExampleModule {}
