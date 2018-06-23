import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzFileUploadComponent } from './extendz-file-upload.component';

describe('ExtendzFileUploadComponent', () => {
  let component: ExtendzFileUploadComponent;
  let fixture: ComponentFixture<ExtendzFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendzFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
