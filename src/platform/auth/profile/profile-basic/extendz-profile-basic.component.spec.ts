import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzProfileBasicComponent } from './extendz-profile-basic.component';

describe('ExtendzProfileBasicComponent', () => {
  let component: ExtendzProfileBasicComponent;
  let fixture: ComponentFixture<ExtendzProfileBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendzProfileBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzProfileBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
