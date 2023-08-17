import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CampaignsService } from '../../service/campaigns.service';
import { DatePipe } from '@angular/common';
import timezone from '../../../../file/timezone.json'
import { CompanyService } from 'src/app/features/company/service/company.service';
import { AllContactService } from 'src/app/features/all-contact/service/all-contact.service';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-campaing-view',
  templateUrl: './campaing-view.component.html',
  styleUrls: ['./campaing-view.component.css']
})
export class CampaingViewComponent implements OnInit {

  finaldata: any = [];
  emaildata:any;
  UserEmailObj:any
  Contact: any;
  userDetails: any;
  id:any;
  n:Number=0;
  locationarray: any;
  locationar1: any;
  locationstring: any;
  Emaildata:any

  constructor(

    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private CampaignsService: CampaignsService,
    private CompanyService: CompanyService,
    private AllContactService: AllContactService,
    private _shared: SharedService,
    



  ) { }
  FromCampaigs: any = FormGroup;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownList1:any = []
  dropdownSettings = {};
  updateCAM: any
  transformedDate: any

  timeZone: { offset: string, name: string }[] = timezone;

  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();

    this.updatecamCampaigs()

    this.from();

    this.AllList();

   
  }

  from() {
    this.FromCampaigs = this.formBuilder.group({

      ToName: ['', [Validators.required]],
      sentTo: ['', [Validators.required, Validators.email]],
      // sentTo: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      // ToCC: [''],
      // ToBCC: [''],
      Subject: ['', [Validators.required]],
      template_Id: ['', [Validators.required]],
      senderEmail: ['', [Validators.required, Validators.email]],
      senderPassword: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Time: ['', [Validators.required]],
      Timezone: ['', [Validators.required]],
    });



    // this.dropdownList = [
    //   // { item_id: 1, item_text: 'Mumbai' },
    //   // { item_id: 2, item_text: 'Bangaluru' },
    //   // { item_id: 3, item_text: 'Pune' },
    //   // { item_id: 4, item_text: 'Navsari' },
    //   // { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   // { item_id: 3, item_text: 'Pune' },
    //   // { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };






  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  // api calling

  updatecamCampaigs() {

  

    console.log("location",this.locationstring)
    let CId = sessionStorage.getItem('camID');
    console.log(CId);

    let Campaigs = {
      campaign_Id: CId
    };

    this.CampaignsService._getcompaignsdata(Campaigs).subscribe((data: any) => {
      this.updateCAM = data.data[1];
      console.log("updateCAM", this.updateCAM[0].sentTo);

      this.FromCampaigs.patchValue({
         sentTo:this.dropdownList,     
                //  sentTo is array of object
        ToName: this.updateCAM[0].ToName,
        senderEmail: this.updateCAM[0].senderEmail,
        senderPassword: this.updateCAM[0].Password,
        Subject: this.updateCAM[0].Subject,
        Date: this.datePipe.transform(this.updateCAM[0].Date, 'yyyy-MM-dd'),
        // Time: this.datePipe.transform(this.updateCAM[0].Date, 'hh-MM'),
        Timezone: this.updateCAM[0].Timezone,
      });
 
      for (let index = 0; index < this.updateCAM[0].sentTo.length; index++) {
        const m = this.updateCAM[0].sentTo[index];
        this.dropdownList1.push({ item_id: index + 1, item_text: m.email });
        console.log(this.dropdownList1, "dropdownList1");
      }
      this.Emaildata = this.dropdownList1;
      console.log("Emaildata",this.Emaildata)



    });
  }



  AllList() {

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.Contact = data[0];
      console.log('check-status', this.Contact);

      console.log('company_Id', this.Contact.company_Id);

      this.id = {
        "company_Id": this.Contact.company_Id
      }

      console.log('id', this.id);
      this.UserEmailObj = { contact_Email: this.userDetails.Email }

    
    });
  }




}
