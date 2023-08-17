import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCamComponent } from './create-cam.component';

describe('CreateCamComponent', () => {
  let component: CreateCamComponent;
  let fixture: ComponentFixture<CreateCamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
