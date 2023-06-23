import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostMatchesContainerComponent } from './lost-matches-container.component';

describe('LostMatchesContainerComponent', () => {
  let component: LostMatchesContainerComponent;
  let fixture: ComponentFixture<LostMatchesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostMatchesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostMatchesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
