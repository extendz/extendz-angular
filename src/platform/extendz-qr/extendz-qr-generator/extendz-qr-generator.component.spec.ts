import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendzQrGeneratorComponent } from './extendz-qr-generator.component';

describe('ExtendzQrGeneratorComponent', () => {
  let component: ExtendzQrGeneratorComponent;
  let fixture: ComponentFixture<ExtendzQrGeneratorComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ExtendzQrGeneratorComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendzQrGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
