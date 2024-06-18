import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteAreaComponent } from './palette-area.component';

describe('PaletteAreaComponent', () => {
  let component: PaletteAreaComponent;
  let fixture: ComponentFixture<PaletteAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaletteAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
