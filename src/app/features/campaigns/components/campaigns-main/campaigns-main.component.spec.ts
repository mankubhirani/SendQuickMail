import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsMainComponent } from './campaigns-main.component';

describe('CampaignsMainComponent', () => {
  let component: CampaignsMainComponent;
  let fixture: ComponentFixture<CampaignsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
