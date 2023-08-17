import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentMainComponent } from './segment-main.component';

describe('SegmentMainComponent', () => {
  let component: SegmentMainComponent;
  let fixture: ComponentFixture<SegmentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
