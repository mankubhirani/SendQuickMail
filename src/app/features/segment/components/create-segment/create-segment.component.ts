import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SegmentService } from '../../service/segment.service';
import { AllContactService } from 'src/app/features/all-contact/service/all-contact.service';
import { CompanyService } from 'src/app/features/company/service/company.service';
import { Console } from 'console';
import { removeData } from 'jquery';

@Component({
  selector: 'app-create-segment',
  templateUrl: './create-segment.component.html',
  styleUrls: ['./create-segment.component.css']
})
export class CreateSegmentComponent implements OnInit {
  submitted = false;
  createSegment: any = FormGroup;
  userDetails: any;
  companydata: any;
  company_Id: any;
  lname: any;
  name: any;
  surchtext: any;
  searchResults: any
  surchdata: any
  searchTerm: any;

  constructor(
    private AllContactService: AllContactService,
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private SegmentService: SegmentService,
    private router: Router,
    private CompanyService: CompanyService,
  ) { }

  get f() { return this.createSegment.controls; }

  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.companydata = data[0];
      console.log('check-status', this.companydata);

      this.company_Id = this.companydata.company_Id;
    })

    this.createSegment = new FormGroup({
      segmentName: new FormControl('', [Validators.required]),
      fieldType: new FormControl(''),
      contactfieldType: new FormControl('', [Validators.required]),
      FieldfindBy: new FormControl('', [Validators.required]),
      criteria: new FormControl('', [Validators.required]),
      // segment: new FormArray([
      //   new FormGroup({
      //     fieldType: new FormControl(''),
      //     contactfieldType: new FormControl(''),
      //     FieldfindBy: new FormControl(''),
      //     criteria: new FormControl(''),
      //   }),
      // ]),
    });
    this.userDetails = this._shared.getUserDetails();
    this.AllList()


  }
  get segmentVail() {
    return this.createSegment.controls;
  }

  get segment(): FormArray {
    return this.createSegment.get('segment') as FormArray;
  }

  // add() {
  //   this.segment.push(
  //     new FormGroup({
  //       fieldType: new FormControl(''),
  //       contactfieldType: new FormControl(''),
  //       FieldfindBy: new FormControl(''),
  //       criteria: new FormControl(''),
  //     })
  //   );
  // }

  remove(i: number) {
    this.segment.removeAt(i);
  }

  url() {
    this.router.navigateByUrl('/segment')
  }

  send() {
    let saveSegmentData = {

      // segment_Id: 1,
      segmentName: this.createSegment.controls['segmentName'].value,
      criteria: this.createSegment.controls['criteria'].value,
      contactfieldType: this.createSegment.controls['contactfieldType'].value,
      FieldfindBy: this.createSegment.controls['FieldfindBy'].value,
      fieldType: this.createSegment.controls['fieldType'].value,
      // segment_users: this.segment,

      Is_And: 1,

      Is_Or: 1,

      IsActive: 1,
      contains: 1,
      UserId: this.userDetails.UserId,
      company_Id: this.company_Id,
    }

    console.log(saveSegmentData);

    let set = saveSegmentData;

    sessionStorage.setItem('create', JSON.stringify(set));

    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/segmentcriteria']));
    }, 2000);

    // this.router.navigate(['/segmentcriteria'])


    // this.SegmentService._postSegmentApi(saveSegmentData).subscribe((res: any) => {
    //   console.log("Data Saved", res);

    //   if (res) {

    //     console.log(res);

    //     console.log(res.message);

    //     if (res.message === "Segment Name is already exists") {


    //       this.router.navigate(['/createSegment']);

    //       this._shared.ToastPopup('Segment Name is already exists', '', 'error');
    //       // return alert("Email is already exist!");

    //     }

    //     if (res.message === "The Segment has been successfully inserted.") {

    //       // this._shared.ToastPopup('', 'done', 'success');
    //       this._shared.ToastPopup(' Successfully', 'Save', 'success');

    //       setTimeout(() => {
    //         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/segmentcriteria']));
    //       }, 2000);

    //     }
    //   }

    // });


  }


  removedData: any

  //  new work in this project 
  Contact: any
  UserEmailObj: any
  emaildata: any
  getAllContact: any
  newArray_contact: any;
  finaldata: any = []
  id: any;


  AllList() {

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.Contact = data[0];

      console.log('company_Id', this.Contact.company_Id);

      this.id = {
        "company_Id": this.Contact.company_Id
      }

      console.log('id', this.id);
      this.UserEmailObj = { contact_Email: this.userDetails.Email }

      this.AllContactService._getbyUserEmail(this.UserEmailObj).subscribe((data: any) => {

        this.emaildata = data.data
        console.log("emaildata", this.emaildata)
        for (let i of this.emaildata) {
          for (let k of i.user_Details) {

            this.finaldata.push(k)

          }
        }
        console.log(this.finaldata, "hello")
      });

    });

  }


  searchData(event: any) {

    console.log("search item", event.target.value);

    this.searchTerm = event.target.value;; // Example search term

    this.searchResults = this.finaldata.filter(item => {
      const firstName = item.First_Name || "";
      const lastName = item.Last_Name || "";
      const country = item.country || "";
      const city = item.city || "";
      const state = item.state || "";
      const email = item.Email || "";

      // Perform case-insensitive search by converting both the search term and the property value to lowercase
      return (
        firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        country.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        state.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });

    console.log("result ", this.searchResults);

    this.surchdata = this.searchResults


  }
  dataSave() {


    if (this.name === "contains") {
      sessionStorage.setItem('Allcontact', JSON.stringify(this.surchdata));
    } else {

      this.removedata()

      this.surchdata = this.removedData
      sessionStorage.setItem('Allcontact', JSON.stringify(this.surchdata));

    }
  }

  removedata() {
    const filteredArray = this.finaldata.filter(obj1 =>
      !this.searchResults.some(obj2 =>
        Object.keys(obj2).every(key => obj1[key] === obj2[key])
      )
    );

    // console.log(filteredArray);

    this.removedData = filteredArray
  }

  contact(evt: any) {
    console.log("Evt", evt.target.value);
    this.name = evt.target.value;
    if (this.name === "contains") {
      let contains = this.searchResults
      console.log("contains", contains);

    }
    else {
      let notcontains = this.removedData
      console.log("notcontains", notcontains);

    }
  }

  ValidateAlpha(event: any) {

 

    var keyCode = (event.which) ? event.which : event.keyCode

 

    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;

    return true;

 

  }
}
