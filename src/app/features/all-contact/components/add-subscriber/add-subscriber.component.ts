import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AllContactService } from '../../service/all-contact.service';
import { CompanyService } from 'src/app/features/company/service/company.service';
import { Console } from 'console';
import { cond } from 'lodash';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.css']
})
export class AddSubscriberComponent implements OnInit {
  contactsForm: FormGroup;
  userDetails: any;
  getAllCountry: any
  userfield: any = [];
  field = '';
  getAllContact: any;
  listdata: any;
  submitted = false;
  companydata: any;
  companyid: any;
  Countrydropdwon: any
  State: any
  cityDropdwon: any
  num: any
  city: any
  stateObj: any
  state_id: any;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private AllContactService: AllContactService,
    private router: Router,
    private route: ActivatedRoute,
    private _companyService: CompanyService,
    private CompanyService: CompanyService,
  ) { }

  // Function to add a new field to the userfield array
  ad() {
    this.userfield.push({ Column_Name: this.field, Column_Value: '' })
    console.log('check', this.field);
    this.field = '';
  }

  getcontrol(name: any): AbstractControl | null {
    return this.contactsForm.get(name);
  }
  ngOnInit(): void {

    // Initialize the form group for contacts
    this.contactsForm = this.formBuilder.group({
      user_Details: new FormArray([
        new FormGroup({
          Email: new FormControl('', [Validators.required , Validators.email]),
          First_Name: new FormControl('',[Validators.required ]),
          Last_Name: new FormControl('',[Validators.required ]),
          country: new FormControl(''),
          state: new FormControl(''),
          city: new FormControl(''),
          CompanyID: new FormControl(5),
          IsActive: new FormControl(1),
        }),
      ]),
    });

    // Fetch all contacts data
    this.AllContactService._getAllContactApi().subscribe((data: any) => {
      this.getAllContact = data[0];
      console.log('Contact List', this.getAllContact);
    });

    // Fetch user details
    this.userDetails = this._shared.getUserDetails();
    console.log('local', this.userDetails)

    // Get the company data for the user
    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {
      this.companydata = data[0];
      console.log('check-status', this.companydata);
      this.companyid = this.companydata.company_Id;
      console.log('companyid', this.companyid);
    })

    // Call functions to get country and state data
    this.getCompanyById();
    this.getallcountry();
    this.getAllstate();
  }

  // Function to get company data by user ID
  getCompanyById() {
    this.AllContactService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {
      this.listdata = data[0];
      console.log('listdata', this.listdata);
    });
  }

  // Function to get all country data
  getallcountry() {
    this.AllContactService._getCountryApi().subscribe((res) => {
      this.getAllCountry = res;
      console.log(" GET country ", this.getAllCountry.data);
      this.Countrydropdwon = this.getAllCountry.data;
    })
  }

  // Function to get all state data for a specific country (country_id: 105)
  getAllstate() {
    let State = {
      "country_id": 105
    }

    this.AllContactService._postState(State).subscribe((res: any) => {
      console.log("YUHVVVVVVVVV", res.data)
      this.cityDropdwon = res.data;
    })
  }

  // Getters for form controls and form arrays
  get f() {
    return this.contactsForm.controls;
  }

  get contact() {
    return this.contactsForm.controls;
  }

  get user_Details(): FormArray {
    return this.contactsForm.get('user_Details') as FormArray;
    console.log(this.contactsForm)
  }

  // Function to add a new contact form group to the form array
  add() {
    this.user_Details.push(
      new FormGroup({
        Email: new FormControl('', [Validators.required, Validators.email]),
        First_Name: new FormControl('',[Validators.required]),
        Last_Name: new FormControl('',[Validators.required]),
        country: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
        IsActive: new FormControl(1),
        CompanyID: new FormControl(5),
      })
    );
    console.log("after push", this.user_Details)
    console.log(this.contactsForm, "jhvjjjksjjksjksjhhejh")
  }

  // Function to remove a contact form group from the form array
  remove(i: number) {
    this.user_Details.removeAt(i);
    console.log(i)
  }

  // Function to add contacts and save data
  addContacts() {
    // Prepare the data to be sent for saving
    let saveSubscribeData = {
      contact_Email: this.userDetails.Email,
      ...this.contactsForm.value,
      file_UploadId: 2,
      IsActive: 1,
      list_Id: 2,
      company_Id: this.companyid,
      contact_Number: this.userDetails.UserPhoneNo,
    }

    console.log('check', (saveSubscribeData));

    // Call the API to save the data
    this.AllContactService._postAddSubscriberApi(saveSubscribeData).subscribe((res: any) => {
      console.log("Data Saved", res);
      if (res) {
        console.log(res);
        console.log(res.message);
        if (res.message === "Email is already exists") {
          this.router.navigate(['/addSubscribers']);
          this._shared.ToastPopup('Email is already exist!', '', 'info');
        }
        if (res.message === "The contact details has been successfully inserted.") {
          this._shared.ToastPopup('Add Subscribers Successfully', '', 'success');
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/allContact']));
          }, 2000);
        }
      }
    });
  }

  // Function to validate input as alphabets only
  ValidateAlpha(event: any) {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;
  }

  // Function to handle changes in the state dropdown and fetch corresponding cities
  on(e: any) {
    let state = e;
    console.log(e)
    this.stateObj = { "state_id": e.target.value }
    console.log("state", e.target.value);

    // Fetch cities for the selected state
    this.AllContactService._postCity(this.stateObj).subscribe((res: any) => {
      console.log("osm", res.data);
      this.city = res.data;
    });
  }

  
}
