import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleExampleComponent } from './google-example.component';

describe('GoogleExampleComponent', () => {
  let component: GoogleExampleComponent;
  let fixture: ComponentFixture<GoogleExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
