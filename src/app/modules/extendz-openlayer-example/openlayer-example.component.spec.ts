import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenlayerExampleComponent } from './openlayer-example.component';

describe('OpenlayerComponent', () => {
  let component: OpenlayerExampleComponent;
  let fixture: ComponentFixture<OpenlayerExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenlayerExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenlayerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
