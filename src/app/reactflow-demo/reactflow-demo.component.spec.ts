import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactflowDemoComponent } from './reactflow-demo.component';

describe('ReactflowDemoComponent', () => {
  let component: ReactflowDemoComponent;
  let fixture: ComponentFixture<ReactflowDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactflowDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactflowDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
