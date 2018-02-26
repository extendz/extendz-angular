import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpirngBootComponent } from './spirng-boot.component';

describe('SpirngBootComponent', () => {
  let component: SpirngBootComponent;
  let fixture: ComponentFixture<SpirngBootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpirngBootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpirngBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
