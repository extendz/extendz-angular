import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileExampleRoutingModule } from './profile-example-routing.module';
import { ProfileExampleComponent } from './profile-example.component';
import { MatTabsModule } from '@angular/material';
import {
  ExtendzProfileBasicModule,
  ExtendzProfileButtonModule
} from '../../../../platform/auth/profile/';

@NgModule({
  imports: [
    CommonModule,
    ProfileExampleRoutingModule,
    //Mat
    MatTabsModule,
    ExtendzProfileBasicModule,
    ExtendzProfileButtonModule
  ],
  declarations: [ProfileExampleComponent]
})
export class ProfileExampleModule {}
