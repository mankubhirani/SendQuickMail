import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { AllMailComponent } from './components/all-mail/all-mail.component';
import { CampaignsMainComponent } from './components/campaigns-main/campaigns-main.component';

import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { CompleteMailComponent } from './components/complete-mail/complete-mail.component';
import { CreateCampaignsComponent } from './components/create-campaigns/create-campaigns.component';
import { DraftMailComponent } from './components/draft-mail/draft-mail.component';
import { OngoingMailComponent } from './components/ongoing-mail/ongoing-mail.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CreateCamComponent } from './components/create-cam/create-cam.component';
import { CampaingViewComponent } from './components/campaing-view/campaing-view.component';
import { CampaignupdateComponent } from './components/campaignupdate/campaignupdate.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CampaignsMainComponent,
    children: [

      { path: '', component: AllMailComponent },
      { path: 'ongoing', component: OngoingMailComponent },
      { path: 'draft', component: DraftMailComponent },
      { path: 'complete', component: CompleteMailComponent },
      { path: 'campaigns', component: CampaignsComponent },
      { path: 'create-campaigns', component: CreateCampaignsComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'campaigns-create', component: CreateCamComponent },
      { path: 'campaigns-view', component: CampaingViewComponent },
      { path: 'campaigns-update', component: CampaignupdateComponent }

    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
