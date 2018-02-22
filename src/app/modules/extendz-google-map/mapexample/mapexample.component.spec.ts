import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapexampleComponent } from './mapexample.component';

describe('MapexampleComponent', () => {
  let component: MapexampleComponent;
  let fixture: ComponentFixture<MapexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
