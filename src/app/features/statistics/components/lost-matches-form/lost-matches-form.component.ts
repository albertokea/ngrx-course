import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PlayerLostMatches } from '@ngrx-example/models/player.model';

@Component({
  selector: 'app-lost-matches-form',
  templateUrl: './lost-matches-form.component.html',
  styleUrls: ['./lost-matches-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LostMatchesFormComponent {

  @Output() player = new EventEmitter<PlayerLostMatches>();

  form: FormGroup = this.formBuilder.group({
    playerName: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    birthDate: new FormControl<string>('', [Validators.required]),
    lostMatches: new FormControl<number>(0, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder) {}

  submitPlayer(){
    this.player.emit(this.form.value);
    this.form.reset();
  }
}
