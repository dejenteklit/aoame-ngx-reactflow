import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSelectionDialogComponent } from './event-selection-dialog.component';

describe('EventSelectionDialogComponent', () => {
  let component: EventSelectionDialogComponent;
  let fixture: ComponentFixture<EventSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSelectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
