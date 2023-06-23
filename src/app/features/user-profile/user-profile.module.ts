import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileContainerComponent } from './containers/user-profile-container/user-profile-container.component';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { StoreModule } from '@ngrx/store';
import * as fromUserData from './state/user-data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserDataEffects } from './state/user-data.effects';



@NgModule({
  declarations: [
    UserProfileContainerComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: UserProfileContainerComponent
    }]),
    StoreModule.forFeature(fromUserData.userDataFeatureKey, fromUserData.reducer),
    EffectsModule.forFeature([UserDataEffects])
  ]
})
export class UserProfileModule { }
