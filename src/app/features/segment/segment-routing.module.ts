import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CreateSegmentComponent } from './components/create-segment/create-segment.component';
import { SegmentComponent } from './components/segment/segment.component';
import { SegmentCriteriaComponent } from './components/segment-criteria/segment-criteria.component';
import { SegmentMainComponent } from './components/segment-main/segment-main.component';
import { EditSegmentComponent } from './components/edit-segment/edit-segment.component';
import { EditSegmentCriteriaComponent } from './components/edit-segment-criteria/edit-segment-criteria.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: SegmentMainComponent,
    children: [
      { path: 'segment', component: SegmentComponent },
      { path: 'createSegment', component: CreateSegmentComponent },
      { path: 'segmentcriteria', component: SegmentCriteriaComponent },
      { path: 'edit-segment', component: EditSegmentComponent },
      { path: 'edit-segmentcriteria', component: EditSegmentCriteriaComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentRoutingModule { }
