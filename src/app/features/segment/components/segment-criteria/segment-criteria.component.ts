import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AllContactService } from 'src/app/features/all-contact/service/all-contact.service';
import { log } from 'console';
import { CompanyService } from 'src/app/features/company/service/company.service';
import { SegmentService } from '../../service/segment.service';
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


@Component({
  selector: 'app-segment-criteria',
  templateUrl: './segment-criteria.component.html',
  styleUrls: ['./segment-criteria.component.css']
})
export class SegmentCriteriaComponent implements OnInit {
  createSegment: any = FormGroup;

  userDetails: any;
  surchdata:any


  getAllContact: any;
  length: any
  newArray_contact: any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 50, 100];
  data: any;
  data1: any;
  data2: any;

  AllContact: any;
  Contact: any;
  id: any;
  getContact: any;
  search: any;
  surchfor:any

  constructor(
    private router: Router,
    private _shared: SharedService,
    private AllContactService: AllContactService,
    private CompanyService: CompanyService,
    private SegmentService: SegmentService,
  ) { }

  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);

    console.log("UserId", this.userDetails.UserId);


    this.data = JSON.parse(sessionStorage.getItem('create') || "[]");
    console.log(this.data);
    // console.log(this.data.criteria);
    // console.log(this.data.contactfieldType);
    this.surchfor = this.data.contactfieldType

    // this.data1 = JSON.parse(sessionStorage.getItem('name') || "[]");
    // this.data2 = JSON.parse(sessionStorage.getItem('lname') || "[]");

    // console.log(this.data1);
    // console.log(this.data2);
    // this.search = {
    //   // "firstName": this.data.criteria,
    //   // "lastName": this.data.criteria,
    //   // "contact_Email": this.data.criteria,
    //   [this.surchfor]:this.data.criteria,
    // }
    //   console.log( this.search)
    // this.SegmentService._filtercontactApi(this.search).subscribe((data: any) => {

    //   this.getContact = data;

    //   console.log('Contact List', this.getContact);

    // });
    const storedData = sessionStorage.getItem('Allcontact');
    if (storedData) {
      this.surchdata = JSON.parse(storedData);
      console.log(this.surchdata);

     
    }

    

   
    this.AllList();

  }


  AllList() {

    // this.AllContactService._getAllContactApi().subscribe((data: any) => {

    //   this.getAllContact = data[0];

    //   console.log('Contact List', this.getAllContact);

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.Contact = data[0];
      console.log('check-status', this.Contact);

      console.log('company_Id', this.Contact.company_Id);

      this.id = {
        "company_Id": this.Contact.company_Id
      }

      console.log('id', this.id);

      this.AllContactService._getbyCompanyid(this.id).subscribe((data: any) => {

        this.getAllContact = data;

        console.log('Contact List', this.getAllContact);

        // console.log('Contact', this.getAllContact.data);

        this.AllContact = this.getAllContact.data;

        // let name = this.AllContact.filter(i => this.data2.includes(i.firstName, i.lastName, i.contact_Email));

        // console.log("filter data ", name);



      });



    });

    this.createSegment = new FormGroup({


      // contact_Email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

    });


   

    


   

  }

  onTabledataChange(event: any) {
    this.page = event;
    this.AllList();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.AllList();
  }


  url() {
    this.router.navigateByUrl('/segment')
  }


  send() {
    let saveSegmentData = {

      // segment_Id: 1,
      segmentName: this.data.segmentName,
      criteria: this.data.criteria,
      contactfieldType: this.data.contactfieldType,
      FieldfindBy: this.data.FieldfindBy,
      fieldType: this.data.fieldType,
      Is_And: this.data.Is_And,

      Is_Or: this.data.Is_Or,

      IsActive: this.data.IsActive,
      contains: this.data.contains,
      UserId: this.data.UserId,
      company_Id: this.data.company_Id,

      segment_users: this.surchdata,

    }

    console.log(saveSegmentData);

    this.SegmentService._postSegmentApi(saveSegmentData).subscribe((res: any) => {
      console.log("Data Saved", res);

      if (res) {

        console.log(res);

        console.log(res.message);

        if (res.message === "Segment Name and company_Id is already exists") {

          sessionStorage.removeItem('create');
          // sessionStorage.removeItem('name');
          // sessionStorage.removeItem('lname');

          this.router.navigate(['/createSegment']);


          this._shared.ToastPopup('Segment Name is already exists', '', 'error');
          // return alert("Email is already exist!");

        }

        if (res.message === "The Segment has been successfully inserted.") {

          sessionStorage.removeItem('create');
          // sessionStorage.removeItem('name');
          // sessionStorage.removeItem('lname');
         
          this._shared.ToastPopup('Segment Save Successfully', '', 'success');

          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/segment']));
          }, 2000);

        }
      }

    });

  }
}
