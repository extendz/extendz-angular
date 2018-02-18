import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartComponent } from './highchart.component';

describe('HighchartComponent', () => {
  let component: HighchartComponent;
  let fixture: ComponentFixture<HighchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
