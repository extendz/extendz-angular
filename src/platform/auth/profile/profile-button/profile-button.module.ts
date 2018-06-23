import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule } from '@angular/material';

import { ExtendzAuthCommonModule } from '../../common';
import { ExtendzProfileButtonComponent } from './profile-button.component';
import { Oauth2Service } from '../../oauth2/oauth2.service';

@NgModule({
  imports: [
    CommonModule,
    ExtendzAuthCommonModule,
    FlexLayoutModule,
    //Mat
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule
  ],
  providers: [Oauth2Service],
  declarations: [ExtendzProfileButtonComponent],
  exports: [ExtendzProfileButtonComponent]
})
export class ExtendzProfileButtonModule {}
