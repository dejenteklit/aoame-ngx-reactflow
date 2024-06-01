import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModellingEnvironmentComponent } from './modelling-environment.component';

describe('ModellingEnvironmentComponent', () => {
  let component: ModellingEnvironmentComponent;
  let fixture: ComponentFixture<ModellingEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModellingEnvironmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModellingEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
