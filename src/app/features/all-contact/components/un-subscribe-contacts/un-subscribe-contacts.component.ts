import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AllContactService } from '../../service/all-contact.service';
import { CompanyService } from 'src/app/features/company/service/company.service';
@Component({
  selector: 'app-un-subscribe-contacts',
  templateUrl: './un-subscribe-contacts.component.html',
  styleUrls: ['./un-subscribe-contacts.component.css']
})
export class UnSubscribeContactsComponent implements OnInit {
  UnsubscribeForm: any = FormGroup;
  companydata: any;
  userDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private AllContactService: AllContactService,
    private _router: Router,
    private route: ActivatedRoute,
    private CompanyService: CompanyService,
  ) { }

  get f() {
    return this.UnsubscribeForm.controls;
  }

  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();

    console.log('local', this.userDetails)

    console.log('UserId', this.userDetails.UserId);

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.companydata = data[0];

      console.log('check-status', this.companydata.company_Id);

    })

    this.UnsubscribeForm = this.formBuilder.group({


      contact_Email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

    });

  }
  url() {
    // this._router.navigate(['/allContact'])
  }

  Unsubscribe() {

    let unSubscribeData = {
      company_Id: this.companydata.company_Id,
      contact_Email: this.UnsubscribeForm.controls['contact_Email'].value,
      isActive: false,

    }

    console.log('check', JSON.stringify(unSubscribeData));

    this.AllContactService.unSubscriberApi(unSubscribeData).subscribe((res: any) => {
      console.log("Data Saved", res);

      if (res) {

        console.log(res);

        console.log(res.message);

        if (res.message === "Invalid contact_Email") {


          this._router.navigate(['/unsucscribeContacts']);

          this._shared.ToastPopup('Email is Invalid!', '', 'error');
          // return alert("Email is already exist!");

        }

        if (res.message === "The contact has been unsubscribe.") {

          // this._shared.ToastPopup('', 'done', 'success');
          this._shared.ToastPopup('Unsubscribe Successfully', '', 'success');

          setTimeout(() => {
            this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => this._router.navigate(['/allContact']));
          }, 2000);

        }

      }

      // this._shared.ToastPopup('Unsubscribe Successfully ', '', 'success');
      // this._router.navigate(['/allContact']);
      // this._shared.ToastPopup('', 'done', 'success');
      // window.location.reload();


    })

  }

}
