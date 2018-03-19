import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrgeneratorexampleComponent } from './qrgeneratorexample.component';

describe('QrgeneratorexampleComponent', () => {
  let component: QrgeneratorexampleComponent;
  let fixture: ComponentFixture<QrgeneratorexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrgeneratorexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrgeneratorexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
