import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import timezone from '../../../../file/timezone.json';
import { CampaignsService } from '../../service/campaigns.service';
import { CompanyService } from 'src/app/features/company/service/company.service';
import { AllContactService } from 'src/app/features/all-contact/service/all-contact.service';
import { SegmentService } from 'src/app/features/segment/service/segment.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EmailTemplateService } from 'src/app/features/email-template/service/email-template.service';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-campaignupdate',
  templateUrl: './campaignupdate.component.html',
  styleUrls: ['./campaignupdate.component.css']
})
export class CampaignupdateComponent implements OnInit {

  finaldata: any = [];
  emaildata: any;
  UserEmailObj: any;
  Contact: any;
  userDetails: any;
  id: any;
  segment: any;
  seg1: any = [];
  segStatus: any;
  prices: any;
  sendereMail: any;
  Template: any;
  Des: any = [];
  seg: any;
  FromCampaigs: any = FormGroup;
  dropdownList: any[] = [];
  selectedItems: any = [];
  dropdownSettings = {};
  updateCAM: any;
  transformedDate: any;
  userdrop: any;
  timeZone: { offset: string, name: string }[] = timezone;
  dropdownList1: any = [];
  Emaildata: any;
  serialNumber: any = 1;
  dropdownListdata: any;
  CId: any;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private CampaignsService: CampaignsService,
    private CompanyService: CompanyService,
    private AllContactService: AllContactService,
    private SegmentService: SegmentService,
    private _shared: SharedService,
    private EmailTemplateService: EmailTemplateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.updatecamCampaigs();
    this.from();
    this.segmentuser();
    this.getuser();
    this.Alltemplatelist();
    this.AllList();
  }

  getcontrol(name: any): AbstractControl | null {
    return this.FromCampaigs.get(name);
  }

  from() {
    this.FromCampaigs = this.formBuilder.group({
      ToName: ['', [Validators.required]],
      sentTo: ['', [Validators.required, Validators.email]],
      Subject: ['', [Validators.required]],
      template_Id: ['', [Validators.required]],
      senderEmail: ['', [Validators.required, Validators.email]],
      senderPassword: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      Date: ['', [Validators.required]],
      Time: ['', [Validators.required]],
      Timezone: ['', [Validators.required]],
    });
  }

  onItemSelect(item: any) {
    this.Des.push({ email: item.item_text });
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  updatecamCampaigs() {
    this.CId = sessionStorage.getItem('camID');
    let Campaigs = {
      campaign_Id: this.CId
    };

    this.CampaignsService._getcompaignsdata(Campaigs).subscribe((data: any) => {
      this.updateCAM = data.data[1];

      this.FromCampaigs.patchValue({
        ToName: this.updateCAM[0].ToName,
        senderEmail: this.updateCAM[0].senderEmail,
        senderPassword: this.updateCAM[0].Password,
        Subject: this.updateCAM[0].Subject,
        Date: this.datePipe.transform(this.updateCAM[0].Date, 'yyyy-MM-dd'),
        Time: this.updateCAM[0].Time,
        Timezone: this.updateCAM[0].Timezone,
      });

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      }

      for (let index = 0; index < this.updateCAM[0].sentTo.length; index++) {
        const m = this.updateCAM[0].sentTo[index];
        this.dropdownList1.push({ item_id: index + 1, item_text: m.email });
      }
      this.Emaildata = this.dropdownList1;
    });
  }

  AllList() {
    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {
      this.Contact = data[0];
      this.id = { "company_Id": this.Contact.company_Id };

      this.UserEmailObj = { contact_Email: this.userDetails.Email }
      this.AllContactService._getbyUserEmail(this.UserEmailObj).subscribe((data: any) => {
        this.emaildata = data.data
        for (let i of this.emaildata) {
          for (let k of i.user_Details) {
            this.finaldata.push(k)
          }
        }

        this.serialNumber = 1;
        for (let i of this.finaldata) {
          this.dropdownList.push({ item_id: this.serialNumber, item_text: i.Email });
          this.serialNumber++;
        }
        this.dropdownListdata = this.dropdownList;
      });
    });
  }

  on(Item: any) {
    console.log('clicked', Item);
    let kk = Item
    console.log('clicked', kk.Name, kk.Email, kk.Password);
  }

  getuser() {
    let UserIdOBJ = {
      UserId: this.userDetails.UserId,
    }

    this.CampaignsService._getuser(UserIdOBJ).subscribe((res: any) => {
      this.userdrop = res.data;
    })
  }

  Status(evt: any) {
    console.log("Evt", evt.target.value);
    this.segStatus = evt.target.value;
    this.segmentuser();
  }

  onClick(a: any) {
    for (let akansha of a.segment_users) {
      this.seg1.push({ email: akansha.Email });
    }
  }

  segmentuser() {
    this.userDetails = this._shared.getUserDetails();
    let id = {
      "UserId": this.userDetails.UserId
    }

    this.SegmentService._getbyUSERidSegmentApi(id).subscribe((res: any) => {
      this.segment = res.data;
    })
  }

  Alltemplatelist() {
    this.EmailTemplateService.getTemplate().subscribe((data: any) => {
      this.Template = data;
    });
  }

  campaigns() {
    this.sendereMail = this.Des.concat(this.seg1);

    let saveCamData = {
      ToName: this.FromCampaigs.controls['ToName'].value,
      sentTo: this.sendereMail,
      ToCC: null,
      ToBCC: null,
      Subject: this.FromCampaigs.controls['Subject'].value,
      template_Id: this.FromCampaigs.controls['template_Id'].value,
      senderEmail: this.FromCampaigs.controls['senderEmail'].value,
      senderPassword: this.FromCampaigs.controls['senderPassword'].value,
      Date: this.FromCampaigs.controls['Date'].value,
      Time: this.FromCampaigs.controls['Time'].value,
      Timezone: this.FromCampaigs.controls['Timezone'].value,
      company_Id: this.Contact.company_Id,
      UserId: this.userDetails.UserId,
      campaign_Id: this.CId
    }

    this.CampaignsService._updateCampaignsApi(saveCamData).subscribe((data: any) => {
      if (data) {
        if (data.message === "Invalid UserId" || data.message === "Invalid company_Id" || data.message === "") {
          this.router.navigate(['/create-campaigns']);
          this._shared.ToastPopup('Campaigns Mail Not Send', '', 'error');
        }

        if (data.message === "The Camapaign has been successfully Updated") {
          this._shared.ToastPopup('Campaigns Mail Successfully', '', 'success');

          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/campaigns']));
          }, 2000);
        }
      }
    });
  }
  ValidateAlpha(event: any) {

 

    var keyCode = (event.which) ? event.which : event.keyCode

 

    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;

    return true;

 

  }
}
