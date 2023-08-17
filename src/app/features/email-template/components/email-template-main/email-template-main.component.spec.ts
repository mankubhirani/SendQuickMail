import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateMainComponent } from './email-template-main.component';

describe('EmailTemplateMainComponent', () => {
  let component: EmailTemplateMainComponent;
  let fixture: ComponentFixture<EmailTemplateMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailTemplateMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailTemplateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
