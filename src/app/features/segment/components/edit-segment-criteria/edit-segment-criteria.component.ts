import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AllContactService } from 'src/app/features/all-contact/service/all-contact.service';
import { log } from 'console';
import { CompanyService } from 'src/app/features/company/service/company.service';
import { SegmentService } from '../../service/segment.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, FormGroupDirective, NgForm, AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';


@Component({
  selector: 'app-edit-segment-criteria',
  templateUrl: './edit-segment-criteria.component.html',
  styleUrls: ['./edit-segment-criteria.component.css']
})
export class EditSegmentCriteriaComponent implements OnInit {
  createSegment: any = FormGroup;

  userDetails: any;


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

  constructor(
    private router: Router,
    private _shared: SharedService,
    private AllContactService: AllContactService,
    private CompanyService: CompanyService,
    private SegmentService: SegmentService,
    private formBuilder: FormBuilder,
  ) { }
  surchdata: any
  storedData:any

  ngOnInit(): void {


    this.storedData = sessionStorage.getItem('Allcontact');
    // console.log(storedData);
    
    if (this.storedData) {
      this.surchdata = JSON.parse(this.storedData);
      console.log(this.surchdata);

     
    }


    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);

    console.log("UserId", this.userDetails.UserId);


    this.data = JSON.parse(sessionStorage.getItem('create') || "[]");

    console.log(this.data);
    console.log(this.data.criteria);
    console.log(this.data.contactfieldType);



    // this.AllList();

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

      this.AllContactService._getbyCompanyid(this.id).subscribe((data: any) => {

        this.getAllContact = data;

        console.log('Contact List', this.getAllContact);

        // console.log('Contact', this.getAllContact.data);

        this.AllContact = this.getAllContact.data;

      });



    });

    this.createSegment = new FormGroup({

    });


    this.search = {
      "firstName": this.data.criteria,
      "lastName": this.data.criteria,
      "contact_Email": this.data.criteria,
    }

    console.log(this.search);


    this.SegmentService._filtercontactApi(this.search).subscribe((data: any) => {

      this.getContact = data;

      console.log('Contact List', this.getContact);

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
    let editsaveSegmentData = {

      segment_Id: this.data.segment_Id,
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

    console.log(editsaveSegmentData);


    this.SegmentService._editSegmentApi(editsaveSegmentData).subscribe((res: any) => {

      console.log("Data Saved", res);

      if (res) {

        console.log(res);

        // console.log(res.message);

        if (res.message === "Invalid UserId" || res.message === "Invalid company_Id ") {

          sessionStorage.removeItem('create');


          this.router.navigate(['/edit-segment']);


          this._shared.ToastPopup('Segment UserId && Company Id Invalid', '', 'error');

        }

        if (res.message === "The Segment has been successfully Updated") {

          sessionStorage.removeItem('create');


          this._shared.ToastPopup('Updated Successfully', '', 'success');

          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/segment']));
          }, 2000);

        }
      }

    });

    // this.router.navigate(['/segmentcriteria'])

    // this._shared.ToastPopup('Updated Successfully', '', 'success');

    // setTimeout(() => {
    //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/segment']));
    // }, 2000);
    // this.router.navigate(['/segment'])
    // window.location.reload();



  }
}

