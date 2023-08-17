import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingViewComponent } from './campaing-view.component';

describe('CampaingViewComponent', () => {
  let component: CampaingViewComponent;
  let fixture: ComponentFixture<CampaingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
