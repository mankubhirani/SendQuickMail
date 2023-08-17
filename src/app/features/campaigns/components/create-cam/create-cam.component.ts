import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaignsService } from '../../service/campaigns.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompanyService } from 'src/app/features/company/service/company.service';


@Component({
  selector: 'app-create-cam',
  templateUrl: './create-cam.component.html',
  styleUrls: ['./create-cam.component.css']
})
export class CreateCamComponent implements OnInit {
  CampaigsFrom: any = FormGroup;
  submitted = false;
  userDetails: any;
  companydata: any;
  companyId: any;


  constructor(private formBuilder: FormBuilder, private CampaignsService: CampaignsService,
    private _shared: SharedService, private CompanyService: CompanyService, private router: Router) { }

  get f() { return this.CampaigsFrom.controls; }




  getcontrol(name: any): AbstractControl | null {
    return this.CampaigsFrom.get(name);
  }
  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();

    console.log('local', this.userDetails)

    console.log('UserId', this.userDetails.UserId);

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.companydata = data[0];
      console.log('check-status', this.companydata);

      this.companyId = this.companydata.company_Id;
    })


    this.CampaigsFrom = this.formBuilder.group({

      campaign_Name: ['', [Validators.required ,Validators.minLength(4)]],
      // mail_alias :  ['', [Validators.required, Validators.email]],

    });

  }



  createcampaigs() {
    
    let saveData = {
      campaign_Name: this.CampaigsFrom.controls['campaign_Name'].value,
      UserId: this.userDetails.UserId,
      company_Id: this.companyId,
      template_Id: 1,
      campaign_TypeId: 1,
    }

    console.log('saveData', saveData);

    this.CampaignsService._CreateCamApi(saveData).subscribe((data) => {
      console.log('company', data)
      
      
      
      this._shared.ToastPopup('Campaigns Successfully', '', 'success');
      this.router.navigate(['/create-campaigns']);

    });

  }

  ValidateAlpha(event: any) {


    var keyCode = (event.which) ? event.which : event.keyCode

    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;

  }

}
