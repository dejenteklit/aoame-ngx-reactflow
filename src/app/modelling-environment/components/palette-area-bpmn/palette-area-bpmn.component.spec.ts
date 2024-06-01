import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteAreaBpmnComponent } from './palette-area-bpmn.component';

describe('PaletteAreaBpmnComponent', () => {
  let component: PaletteAreaBpmnComponent;
  let fixture: ComponentFixture<PaletteAreaBpmnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaletteAreaBpmnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteAreaBpmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
