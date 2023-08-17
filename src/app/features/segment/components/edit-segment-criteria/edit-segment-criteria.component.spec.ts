import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSegmentCriteriaComponent } from './edit-segment-criteria.component';

describe('EditSegmentCriteriaComponent', () => {
  let component: EditSegmentCriteriaComponent;
  let fixture: ComponentFixture<EditSegmentCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSegmentCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSegmentCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
