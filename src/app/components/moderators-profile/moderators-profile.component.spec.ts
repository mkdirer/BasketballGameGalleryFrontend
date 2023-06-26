import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorsProfileComponent } from './moderators-profile.component';

describe('ModeratorsProfileComponent', () => {
  let component: ModeratorsProfileComponent;
  let fixture: ComponentFixture<ModeratorsProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeratorsProfileComponent]
    });
    fixture = TestBed.createComponent(ModeratorsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
