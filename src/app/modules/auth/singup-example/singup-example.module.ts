import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingupExampleRoutingModule } from './singup-example-routing.module';
import { SingupExampleComponent } from './singup-example.component';

@NgModule({
  imports: [CommonModule, SingupExampleRoutingModule],
  declarations: [SingupExampleComponent]
})
export class SingupExampleModule {}
