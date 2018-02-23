import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { SpirngBootComponent } from './spirng-boot/spirng-boot.component';
import { DocumentationComponent } from './documentation.component';

@NgModule({
  imports: [CommonModule, DocumentationRoutingModule],
  declarations: [SpirngBootComponent, DocumentationComponent]
})
export class DocumentationModule {}
