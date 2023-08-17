import { Component, OnInit } from '@angular/core';
import { CampaignsService } from '../../service/campaigns.service';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  userDetails: any;

  getSchedulerData:any
  UserId:any

  constructor(private CampaignsService: CampaignsService,
    private formBuilder: FormBuilder,
    // private ngxService: NgxUiLoaderService,
    private router: Router,
    private _shared: SharedService,


  ) { }

  ngOnInit(): void {
    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails, this.userDetails.UserId);

    this.UserId = this.userDetails.UserId


    this.getdata();

  }



  getdata() {

   let UserIdObj = {
      UserId: this.UserId

    }


    this.CampaignsService.getScheduler(UserIdObj).subscribe((res: any) => {

      this.getSchedulerData = res.data
      console.log('this.xyz',this.getSchedulerData)
    })

  }


}
