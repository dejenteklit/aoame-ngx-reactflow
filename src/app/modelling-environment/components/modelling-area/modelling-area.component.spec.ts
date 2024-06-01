import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModellingAreaComponent } from './modelling-area.component';

describe('ModellingAreaComponent', () => {
  let component: ModellingAreaComponent;
  let fixture: ComponentFixture<ModellingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModellingAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModellingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
