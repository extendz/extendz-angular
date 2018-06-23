import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExampleComponent } from './profile-example.component';

describe('ProfileExampleComponent', () => {
  let component: ProfileExampleComponent;
  let fixture: ComponentFixture<ProfileExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
