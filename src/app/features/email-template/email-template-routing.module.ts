import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { EmailTemplateComponent } from './components/email-template/email-template.component';
import { EmailTemplateMainComponent } from './components/email-template-main/email-template-main.component';
import { TemplateViewComponent } from './components/template-view/template-view.component';
import { TemplateeditorComponent } from './components/templateeditor/templateeditor.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EmailTemplateMainComponent,
    children: [
      { path: 'email-template', component: EmailTemplateComponent },
      { path: 'template', component: TemplateViewComponent },
      { path: 'template-editor', component: TemplateeditorComponent },
   
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
