import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendzOpenlayerModule } from '../../../platform/extendz-openlayer';
import { OpenlayerExampleRoutingModule } from './openlayer-example-routing.module';
import { OpenlayerExampleComponent } from './openlayer-example.component'
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    OpenlayerExampleRoutingModule,
    CommonModule,
    MatTabsModule,
    ExtendzOpenlayerModule,
    
    
    // 
  ],
  declarations: [OpenlayerExampleComponent]
})
export class OpenlayerExampleModule { }
