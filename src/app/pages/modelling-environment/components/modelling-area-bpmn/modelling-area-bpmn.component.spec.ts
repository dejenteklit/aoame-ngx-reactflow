import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModellingAreaBpmnComponent } from './modelling-area-bpmn.component';

describe('ModellingAreaBpmnComponent', () => {
  let component: ModellingAreaBpmnComponent;
  let fixture: ComponentFixture<ModellingAreaBpmnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModellingAreaBpmnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModellingAreaBpmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
