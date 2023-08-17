import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { AllMailComponent } from './components/all-mail/all-mail.component';
import { CampaignsMainComponent } from './components/campaigns-main/campaigns-main.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { CompleteMailComponent } from './components/complete-mail/complete-mail.component';
import { CreateCampaignsComponent } from './components/create-campaigns/create-campaigns.component';
import { DraftMailComponent } from './components/draft-mail/draft-mail.component';
import { OngoingMailComponent } from './components/ongoing-mail/ongoing-mail.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateCamComponent } from './components/create-cam/create-cam.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CampaingViewComponent } from './components/campaing-view/campaing-view.component';
import { CampaignupdateComponent } from './components/campaignupdate/campaignupdate.component';

@NgModule({
  declarations: [
    AllMailComponent,
    CampaignsMainComponent,
    CampaignsComponent,
    CompleteMailComponent,
    CreateCampaignsComponent,
    DraftMailComponent,
    OngoingMailComponent,
    ScheduleComponent,
    CreateCamComponent,
    CampaingViewComponent,
    CampaignupdateComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatIconModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class CampaignsModule { }
