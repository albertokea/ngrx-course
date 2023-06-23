import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '@ngrx-example/shared/auth/state/auth.actions';
import * as AuthSelectors from '@ngrx-example/shared/auth/state/auth.selectors';
@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {

  error$ = this.store.select(AuthSelectors.selectError);

  form: FormGroup = this.formBuilder.group({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  sendLogin(){
    this.store.dispatch(
      AuthActions.userLogin({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
    );
  }

}
