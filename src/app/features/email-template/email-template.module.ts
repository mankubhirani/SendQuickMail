import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateComponent } from './components/email-template/email-template.component';
import { EmailTemplateMainComponent } from './components/email-template-main/email-template-main.component';
import { TemplateViewComponent } from './components/template-view/template-view.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateeditorComponent } from './components/templateeditor/templateeditor.component'; 
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    EmailTemplateComponent,
    EmailTemplateMainComponent,
    TemplateViewComponent,
    TemplateeditorComponent
  ],
  imports: [
  
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    AngularEditorModule,
    CommonModule,
    EmailTemplateRoutingModule,
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
    Ng2SearchPipeModule,
    OrderModule,
    
  ]
})
export class EmailTemplateModule { }
