import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostMatchesFormComponent } from './lost-matches-form.component';

describe('LostMatchesFormComponent', () => {
  let component: LostMatchesFormComponent;
  let fixture: ComponentFixture<LostMatchesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostMatchesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostMatchesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
