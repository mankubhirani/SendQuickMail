import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/profile/component/login/login.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},

  {
    path: '',
    loadChildren: () => import('./features/profile/profile.module').then((m) => m.ProfileModule)
  },

  {
    path: '',
    loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
    
  },

  {
    path: '',
    loadChildren: () => import('./features/company/company.module').then((m) => m.CompanyModule)  
  },

  {
    path: '',
    loadChildren: () => import('./features/profile-user/profile-user.module').then((m) => m.ProfileUserModule)  
  },

  {
    path: '',
    loadChildren: () => import('./features/email-template/email-template.module').then((m) => m.EmailTemplateModule)  
  },

  {
    path: '',
    loadChildren: () => import('./features/segment/segment.module').then((m) => m.SegmentModule)  
  },

  {
    path: '',
    loadChildren: () => import('./features/campaigns/campaigns.module').then((m) => m.CampaignsModule)  
  },

  {
    path: '',
    loadChildren: () => import('./features/all-contact/all-contact.module').then((m) => m.AllContactModule)  
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
