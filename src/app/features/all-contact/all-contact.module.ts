import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllContactRoutingModule } from './all-contact-routing.module';
import { AddSubscriberComponent } from './components/add-subscriber/add-subscriber.component';
import { ContactMainComponent } from './components/contact-main/contact-main.component';
import { AllContactsComponent } from './components/all-contacts/all-contacts.component';
import { ImportContactsComponent } from './components/import-contacts/import-contacts.component';
import { ReviewImportComponent } from './components/review-import/review-import.component';
import { UnSubscribeContactsComponent } from './components/un-subscribe-contacts/un-subscribe-contacts.component';
import { UploadContactComponent } from './components/upload-contact/upload-contact.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AddSubscriberComponent,
    ContactMainComponent,
    AllContactsComponent,
    ImportContactsComponent,
    ReviewImportComponent,
    UnSubscribeContactsComponent,
    UploadContactComponent,
    ViewContactsComponent
  ],
  imports: [
    CommonModule,
    AllContactRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatIconModule,
    NgxPaginationModule,
  ]
})
export class AllContactModule { }
