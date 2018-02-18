import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartExampleComponent } from './highchart-example.component';

describe('HighchartExampleComponent', () => {
  let component: HighchartExampleComponent;
  let fixture: ComponentFixture<HighchartExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighchartExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
