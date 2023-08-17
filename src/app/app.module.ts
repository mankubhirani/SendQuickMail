import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Constants } from './config/constant';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from './features/profile/profile.module';
import { ToastrModule } from 'ngx-toastr';
// import { LoaderModule } from './shared/loader/loader.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerInterceptor } from './core/interceptors/server.interceptor';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // LoaderModule,
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileModule,
    SharedModule,
    MatIconModule,
    CoreModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [Constants, DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],

 
  bootstrap: [AppComponent]
})
export class AppModule { }
