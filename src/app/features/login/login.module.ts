import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAuthModule } from 'src/app/shared/auth/shared-auth.module';



@NgModule({
  declarations: [
    LoginContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedAuthModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginContainerComponent
      }
    ])
  ]
})
export class LoginModule { }
