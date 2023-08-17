import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { AddSubscriberComponent } from './components/add-subscriber/add-subscriber.component';
import { ContactMainComponent } from './components/contact-main/contact-main.component';
import { AllContactsComponent } from './components/all-contacts/all-contacts.component';
import { ImportContactsComponent } from './components/import-contacts/import-contacts.component';
import { ReviewImportComponent } from './components/review-import/review-import.component';
import { UnSubscribeContactsComponent } from './components/un-subscribe-contacts/un-subscribe-contacts.component';
import { UploadContactComponent } from './components/upload-contact/upload-contact.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ContactMainComponent,
    children: [
      { path: 'addSubscribers', component: AddSubscriberComponent },
      { path: 'importContact', component: ImportContactsComponent },
      { path: 'viewContact', component: ViewContactsComponent },
      { path: 'unsucscribeContacts', component: UnSubscribeContactsComponent },
      { path: 'allContact', component: AllContactsComponent },
      { path: 'view', component: ReviewImportComponent },
      { path: 'allContact/addSubscribers/importContact/upload', component: UploadContactComponent },
      { path: 'allContact/importContact/upload', component: UploadContactComponent },
      { path: 'allContact/importContact/upload', component: UploadContactComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllContactRoutingModule { }
