import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SegmentRoutingModule } from './segment-routing.module';
import { CreateSegmentComponent } from './components/create-segment/create-segment.component';
import { SegmentComponent } from './components/segment/segment.component';
import { SegmentCriteriaComponent } from './components/segment-criteria/segment-criteria.component';
import { SegmentMainComponent } from './components/segment-main/segment-main.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { EditSegmentComponent } from './components/edit-segment/edit-segment.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditSegmentCriteriaComponent } from './components/edit-segment-criteria/edit-segment-criteria.component';


@NgModule({
  declarations: [
    CreateSegmentComponent,
    SegmentComponent,
    SegmentCriteriaComponent,
    SegmentMainComponent,
    EditSegmentComponent,
    EditSegmentCriteriaComponent
  ],
  imports: [
    
    CommonModule,
    SegmentRoutingModule,
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
    Ng2SearchPipeModule
  ]
})
export class SegmentModule { }
