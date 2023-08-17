import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AllContactService } from 'src/app/features/all-contact/service/all-contact.service';
import timezone from '../../../../file/timezone.json';
import { DatePipe } from '@angular/common';
import { CampaignsService } from '../../service/campaigns.service';
import { CompanyService } from 'src/app/features/company/service/company.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailTemplateService } from 'src/app/features/email-template/service/email-template.service';
import { SegmentService } from 'src/app/features/segment/service/segment.service';

interface UserDetails {
  city: string;
  state: string;
  country: string;
  CompanyID: number;
  first_Name?: string;
  last_Name: string;
  contact_Email: string;
}

interface UserData {
  user_Details: UserDetails[];
}

@Component({
  selector: 'app-create-campaigns',
  templateUrl: './create-campaigns.component.html',
  styleUrls: ['./create-campaigns.component.css']
})
export class CreateCampaignsComponent implements OnInit {
  userdrop: any;
  emailList: string[] = [];
  submitted = false;
  sendereMail: any;
  prices: any;
  updateCAM: any
  segment: any;
  segStatus: any;
  CId: any

  seg1: any = []

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};

  timeZone: { offset: string, name: string }[] = timezone;

  getAllContact: any;

  FromCampaigs: any = FormGroup;
  current_date: any;

  myDate = new Date();

  date: any;

  userDetails: any;

  Template: any;


  emailfrom: any;

  companydata: any;
  cid: any;
  Emaildata: any;
  Id: any;
  user: any = []

  Des: any = []
  seg: any;


  constructor(
    private router: Router,
    private _shared: SharedService,
    private AllContactService: AllContactService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private CampaignsService: CampaignsService,
    private CompanyService: CompanyService,
    private ngxService: NgxUiLoaderService,
    private EmailTemplateService: EmailTemplateService,
    private SegmentService: SegmentService,
  ) {
    this.current_date = this.datePipe.transform(this.myDate, 'mm/dd/yyyy');

    console.log("current " + this.current_date);



  }
  getcontrol(name: any): AbstractControl | null {
    return this.FromCampaigs.get(name);
  }

  get f() { return this.FromCampaigs.controls; }

  ngOnInit(): void {



    const data: UserData[] = [
      // Your array of objects here
    ];




    this.userDetails = this._shared.getUserDetails();

    console.log('local', this.userDetails)

    console.log('UserId', this.userDetails.UserId);

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.companydata = data[0];

      console.log('check-status', this.companydata.company_Id);

      let Id =
      {
        contact_Email: this.userDetails.Email
      }

      console.log('Get users Info', Id);

      this.AllContactService._getbyUserEmail(Id).subscribe((res: any) => {
        this.Emaildata = res.data;
        console.log('res', this.Emaildata);



        for (let i of this.Emaildata) {


          for (let j of i.user_Details) {

            console.log(j.Email)

            this.user.push({ item_id: j, item_text: j.Email });

          }


        }

        this.Emaildata = this.user;

        console.log(this.Emaildata)
        //   // for(let i of this.Emaildata) {
        //   //   this.user.push({ item_id: i.id, item_text: i.contact_Email});
        //   //   // this.Des.push({item_id: i.id, item_text: i.designation});
        //   // }
      })

    })


    //     this.FromCampaigs = this.formBuilder.group({

    //       user: ['', [Validators.required]],
    //       from: ['', [Validators.required, Validators.email]],
    //       pass: ['', [Validators.required]],
    //       To: ['', [Validators.required]],
    //       subject: ['', [Validators.required]],
    //       html: ['', [Validators.required]],
    //       Date: ['', [Validators.required]],
    //       Time: ['', [Validators.required]],
    //     });

    //     console.log('timezone', JSON.stringify(this.timeZone));

    //     this.dropdownSettings = {
    //       singleSelection: false,
    //       idField: 'item_id',
    //       textField: 'item_text',
    //       selectAllText: 'Select All',
    //       unSelectAllText: 'UnSelect All',
    //       itemsShowLimit: 3,
    //       allowSearchFilter: true
    //     };

    //     this.AllList()
    //   }

    //   onItemSelect(item: any) {
    //     this.Des.push(item.item_text);
    //     console.log(item.item_text);
    //     console.log("This is Selec val ",this.Des);
    //   }
    //   onSelectAll(items: any) {
    //     console.log(items);
    //   }

    //   Email(e: any) {
    //     this.emailfrom = e.target.value;
    //     console.log("emailfrom", e.target.value)
    //   }



    //   url() {
    //     this.router.navigate['/importContact']
    //   }

    //   campaigns() {

    //     let saveCamData = {

    //       user: this.FromCampaigs.controls['user'].value,
    //       pass: this.FromCampaigs.controls['pass'].value,
    //       from: this.emailfrom,
    //       To: this.Des,
    //       subject: this.FromCampaigs.controls['subject'].value,
    //       html: this.FromCampaigs.controls['html'].value,
    //       Date: this.FromCampaigs.controls['Date'].value,
    //       Time: this.FromCampaigs.controls['Time'].value,

    //     }

    //     console.log('saveCamData', saveCamData);
    //     this.ngxService.start();
    //     this.CampaignsService._CreateCampaignsApi(saveCamData).subscribe((data: any) => {
    //       console.log('company', data)
    //       this.ngxService.stop();
    //       this.router.navigate(['/campaigns']);
    //       this._shared.ToastPopup('Campaigns Mail Successfully', '', 'success');

    //     });
    //     // this.getData();
    //   }

    //   // getData(): void {
    //   //   // this.CampaignsService._getbycontactEmailApi(this.Id).subscribe((res: any) => {
    //   //   //   this.Emaildata = res.data;
    //   //   //   console.log('res', this.Emaildata);

    //   //     for (let i of this.Emaildata) {
    //   //       this.user.push({ item_id: i.id, item_text: i.contact_Email });
    //   //     }

    //   //     this.Emaildata = this.user;
    //   //   // })

    //   // }

    //   AllList() {

    //     this.EmailTemplateService.getTemplate().subscribe((data: any) => {

    //       this.Template = data;
    //       console.log('data', this.Template);
    //       // console.log('data', this.Template.template_Name);
    //       // console.log('data', this.Template.body);
    //       // this.xyz =  this.Template.body


    //     });
    //   }

    // }


    this.FromCampaigs = this.formBuilder.group({

      ToName: ['', [Validators.required]],
      sentTo: ['', [Validators.required, Validators.email]],
      // sentTo: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      // ToCC: [''],
      // ToBCC: [''],
      Subject: ['', [Validators.required]],
      template_Id: ['', [Validators.required]],
      senderEmail: ['', [Validators.required, Validators.email]],
      senderPassword: ['', [Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      Date: ['', [Validators.required]],
      Time: ['', [Validators.required]],
      Timezone: ['', [Validators.required]],
    });

    console.log('timezone', JSON.stringify(this.timeZone));



    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.AllList();

    this.segmentuser();
    this.getuser();


  }

  onItemSelect(item: any) {
    this.Des.push({ email: item.item_text });
    console.log(item.item_text);
    console.log("This is Selec val ", this.Des);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  Email(e: any) {
    this.emailfrom = e.target.value;
    console.log("emailfrom", e.target.value)
  }



  url() {
    this.router.navigate['/importContact']
  }



  AllList() {

    this.EmailTemplateService.getTemplate().subscribe((data: any) => {

      this.Template = data;
      console.log('data', this.Template);


    });
  }


  onClick(a: any) {
    console.log(a.segment_users)
    for (let akansha of a.segment_users) {
      this.seg1.push({ email: akansha.Email });
      console.log(this.seg1, "akansha.Email")
    }

  }


  segmentuser() {

    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);

    console.log("UserId", this.userDetails.UserId);

    let id = {
      "UserId": this.userDetails.UserId
    }

    console.log("UserId", id);

    this.SegmentService._getbyUSERidSegmentApi(id).subscribe((res: any) => {
      // this.SegmentService._getSegmentApi().subscribe((res) => {
      this.segment = res.data;

      console.log('segment', this.segment);

      // for (var j = 0; j < this.segment.length; j++) {

      //   // console.log('segmentName ', this.segment[j].segmentName);

      //   if (this.segment[j].segmentName == this.segStatus) {

      //     this.prices = this.segment[j].segment_users.map((car) => (car.contact_Email))

      //     console.log(this.prices);

      //     for (var i = 0; i < this.prices.length; i++) {

      //       this.seg1.push({ email: this.prices[i] });

      //       // console.log("Segment email ", this.seg1);
      //     }
      //     // this.seg1.push({ email: this.prices[j] })

      //   }

      // }

      console.log("Segment email ", this.seg1);

    })

  }


  campaigns() {

    // this.abcd = [this.Des, this.seg1];

    console.log(this.Des, this.seg1)

    {
      this.sendereMail = this.Des.concat(this.seg1);
      console.log("botharray......", this.sendereMail);
    }


    let saveCamData = {

      ToName: this.FromCampaigs.controls['ToName'].value,
      // sentTo: this.Des,
      sentTo: this.sendereMail,
      body: null,
      ToCC: null,
      ToBCC: null,
      Subject: this.FromCampaigs.controls['Subject'].value,
      template_Id: this.FromCampaigs.controls['template_Id'].value,
      senderEmail: this.FromCampaigs.controls['senderEmail'].value,
      senderPassword: this.FromCampaigs.controls['senderPassword'].value,

      Date: this.FromCampaigs.controls['Date'].value,
      Time: this.FromCampaigs.controls['Time'].value,
      Timezone: this.FromCampaigs.controls['Timezone'].value,
      company_Id: this.companydata.company_Id,
      UserId: this.userDetails.UserId,
      // To: ,
      // html: this.FromCampaigs.controls['html'].value,

    }

    // this.submitted = true;

    // if (this.FromCampaigs.invalid) {

    //   this._shared.ToastPopup('Invalid Details', '', 'error');

    //   // alert("Invalid Details");

    //   return console.log("Invalid Details");

    // }

    // if (this.submitted && this.FromCampaigs.valid) {

    console.log('saveCamData', saveCamData);
    // this.ngxService.start();
    this.CampaignsService._CreateCampaignsApi(saveCamData).subscribe((data: any) => {
      console.log('company', data)
      // this.ngxService.stop();
      // this.router.navigate(['/campaigns']);
      // this._shared.ToastPopup('Campaigns Mail Successfully', '', 'success');
      if (data) {

        console.log(data);

        console.log(data.message);

        if (data.message === "Invalid UserId" || data.message === "Invalid company_Id ") {


          this.router.navigate(['/create-campaigns']);

          this._shared.ToastPopup('Campaigns Mail Not Send', '', 'error');

        }

        if (data.message === "The campaign has been successfully inserted.") {

          this._shared.ToastPopup('Campaigns Mail Successfully', '', 'success');

          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/campaigns']));
          }, 2000);

        }

      }


    });
    // this.getData();
  }

  getuser() {




    let UserIdOBJ = {

      UserId: this.userDetails.UserId,

    }

    this.CampaignsService._getuser(UserIdOBJ).subscribe((res: any) => {

      this.userdrop = res.data

      console.log("UYUFYUFUYFFH", this.userdrop)

    })
  }

  on(Item: any) {

    console.log('clicked', Item);

    let kk = Item
    console.log('clicdghfked', kk.Name, kk.Email, kk.Password);

    this.FromCampaigs.patchValue({
      ToName: kk.Name,
      senderEmail: kk.Email,
      senderPassword: kk.Password
    })

  }

  ValidateAlpha(event: any) {

 

    var keyCode = (event.which) ? event.which : event.keyCode

 

    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;

    return true;

 

  }

}


// }
