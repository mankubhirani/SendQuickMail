import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup,
  Validators, FormBuilder, FormArray, FormGroupDirective, NgForm, AbstractControl, ValidationErrors, ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SegmentService } from '../../service/segment.service';
import { Console, log } from 'console';
import { AllContactService } from 'src/app/features/all-contact/service/all-contact.service';
import { CompanyService } from 'src/app/features/company/service/company.service';

@Component({
  selector: 'app-edit-segment',
  templateUrl: './edit-segment.component.html',
  styleUrls: ['./edit-segment.component.css']
})
export class EditSegmentComponent implements OnInit {
  editSegment: any = FormGroup;
  slength: any;
  userDetails: any;

  submitted = false;
  surchtext:any

  veventcriteria: any;
  vcontactfieldtype: any;
  vfieldfindbY: any;

  arrsegment: any

  reqBody: any;
  arrayofobj: any = [];
  arrObj: any = [];
  segmentForEdit: any = null;

  isEditMode = false;

  accountBtn = "Add";

  segmentdata: any;

  segment_Id: any;

  

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private SegmentService: SegmentService,
    private router: Router,
    private CompanyService: CompanyService,
    private AllContactService: AllContactService,

  ) { }

  ngOnInit(): void {
    console.log(this.surchtext)
    this.segmentForEdit = this.SegmentService.segmentForEdit;

    // console.log('check value', this.segmentForEdit);



    this.userDetails = this._shared.getUserDetails();

    console.log("message", this.userDetails);

    // console.log("company_Id", this.userDetails.company_Id);

    this.editSegment = new FormGroup({
      segmentName: new FormControl('', [Validators.required]),
      fieldType: new FormControl(''),
      contactfieldType: new FormControl('', [Validators.required]),
      FieldfindBy: new FormControl('', [Validators.required]),
      criteria: new FormControl('', [Validators.required]),
      // });
      // segment_users: new FormArray([
      //   new FormGroup({
      //     fieldType: new FormControl(''),
      //     contactfieldType: new FormControl(''),
      //     FieldfindBy: new FormControl(''),
      //     criteria: new FormControl(''),
      //   }),
      // ]),

    });


    let data = JSON.parse(sessionStorage.getItem('abc') || "[]");

    this.segmentdata = data;

    console.log("abc", this.segmentdata);

    console.log("company_Id", this.segmentdata.company_Id);

    console.log("abc", this.segmentdata.segment_Id);

    console.log("abc", this.segmentdata.segment_users[0]);

    this.editSegment.patchValue({
      'segment_Id': this.segmentdata.segment_Id,
      'segmentName': this.segmentdata.segmentName,
      'fieldType': this.segmentdata.criteria,
      'contactfieldType': this.segmentdata.contactfieldType,
      'FieldfindBy': this.segmentdata.FieldfindBy,
      'criteria': this.segmentdata.criteria,

    });

    console.log(this.segmentdata.segment_users)

    this.slength = this.segmentdata.segment_users.length;

    console.log("length ", this.slength)

    // let s = 0;

    // this.segment_users.patchValue([{
    //   fieldType: this.segmentdata.segment_users[s].fieldType,
    //   contactfieldType: this.segmentdata.segment_users[s].contactfieldType,
    //   FieldfindBy: this.segmentdata.segment_users[s].FieldfindBy,
    //   criteria: this.segmentdata.segment_users[s].criteria,
    // }]);

    console.log("hii.....................", this.segmentdata.segment_users)

    for (let s = 0; s < this.slength; s++) {

      console.log("s", s)


      let segment_user = {
        fieldType: this.segmentdata.segment_users[s].fieldType,
        contactfieldType: this.segmentdata.segment_users[s].contactfieldType,
        FieldfindBy: this.segmentdata.segment_users[s].FieldfindBy,
        criteria: this.segmentdata.segment_users[s].criteria,

      };

      this.arrObj.push(segment_user)

      console.log("..data for patching..", segment_user)

      this.arrayofobj.push(segment_user)

      console.log("data", this.arrayofobj)



    }
    // this.segment_users.patchValue(this.arrayofobj)

    console.log("..lenght..", this.arrayofobj)

    // this.segment_users.patchValue(this.arrayofobj)

    // this.arrayofobj.patchValue([this.arrayofobj])

    // this.arrayofobj.patchValue({
    //   'contactfieldType': this.arrayofobj.contactfieldType,
    //   'FieldfindBy': this.arrayofobj.FieldfindBy,
    //   'criteria': this.arrayofobj.criteria,
    //   'fieldType': this.arrayofobj.fieldType,
    // });
    this.AllList()

  }


  // setUserData(segmentForEdit) {
  //   console.log('check value', segmentForEdit);

  //   console.log("abcd", this.segmentdata);

  //   this.editSegment.patchValue({

  //     'segmentName': this.segmentdata.segmentName,
  //     'contactfieldType': this.segmentdata.contactfieldType,
  //     'FieldfindBy': this.segmentdata.FieldfindBy,
  //     'criteria': this.segmentdata.criteria,


  //   });

  // }


  get segmentVail() {
    return this.editSegment.controls;
  }

  // get segment_users(): FormArray {
  //   return this.editSegment.get('segment_users') as FormArray;
  // }

  // add() {
  //   this.segment_users.push(
  //     new FormGroup({
  //       fieldType: new FormControl(''),
  //       contactfieldType: new FormControl(''),
  //       FieldfindBy: new FormControl(''),
  //       criteria: new FormControl(''),
  //     })
  //   );
  //   // console.log("val..........", this.segment_users);
  // }



  // remove(i: number) {
  //   this.segment_users.removeAt(i);
  // }

  // remo() {
  //   sessionStorage.removeItem('abc');
  // }


  eventFieldfindBy(e: any) {

    this.vfieldfindbY = e.target.value;
    console.log("eventFieldfindBy", e.target.value)
  }
  eventcontactfieldType(e: any) {
    this.vcontactfieldtype = e.target.value;
    console.log("eventcontactfieldType", e.target.value)
  }
  eventcriteria(e: any) {
    this.veventcriteria = e.target.value;
    console.log("eventcriteria", e.target.value)
  }

  Edit_Segment() {


    // console.log("val.....checking.....", this.segment_users.value);


    let editsaveSegmentData = {

      segment_Id: this.segmentdata.segment_Id,
      segmentName: this.editSegment.controls['segmentName'].value,
      criteria: this.editSegment.controls['criteria'].value,
      contactfieldType: this.editSegment.controls['contactfieldType'].value,
      FieldfindBy: this.editSegment.controls['FieldfindBy'].value,
      fieldType: this.editSegment.controls['fieldType'].value,

      Is_And: 1,

      Is_Or: 1,

      IsActive: 1,
      contains: 1,
      UserId: this.userDetails.UserId,
      company_Id: this.segmentdata.company_Id,

    }

    console.log(editsaveSegmentData);

    let set = editsaveSegmentData;

    sessionStorage.setItem('create', JSON.stringify(set));

    // sessionStorage.setItem('edit', JSON.stringify(set));

    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/edit-segmentcriteria']));
    }, 2000);





    // this.router.navigate(['/segmentcriteria'])

    // this.arrsegment = this.segment_users.push(
    //   new FormGroup({
    //     fieldType: new FormControl(''),
    //     contactfieldType: new FormControl(this.vcontactfieldtype),
    //     FieldfindBy: new FormControl(this.vfieldfindbY),
    //     criteria: new FormControl(this.veventcriteria),
    //   })
    // );

    // // console.log(saveSegmentData);

    // console.log("edit.............", this.editSegment.value)


    // this.reqBody = {
    //   ...saveSegmentData,
    //   ...this.editSegment.value,
    //   // ...this.arrsegment,
    //   // ...this.veventcriteria,
    //   // ...this.vcontactfieldtype,
    //   // ...this.vfieldfindbY,
    // };

    // console.log("updaTING.............", this.reqBody);


    // this.SegmentService._editSegmentApi(this.reqBody).subscribe((res) => {
    //   console.log("Data Saved", res);

    //   sessionStorage.removeItem('abc');

    //   this.router.navigate(['/segmentcriteria'])

    //   this._shared.ToastPopup('Updated Successfully', '', 'success');

    //   // setTimeout(() => {
    //   //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/segment']));
    //   // }, 2000);
    //   // this.router.navigate(['/segment'])
    //   // window.location.reload();

    // });

  }

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

  searchTerm: any;
  searchResults: any
  surchdata: any
  removedData: any
  name: any;

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
     this.removedData
      console.log("notcontains",this. removedData);

    }
  }


  dataSave() {
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",this.surchdata);
    
    console.log(this.name);

    if (this.name === "contains") {
      console.log(this.surchdata)
      sessionStorage.setItem('Allcontact', JSON.stringify(this.surchdata));
      this.Edit_Segment()

    } else {

      this.removedata()

      this.surchdata = this.removedData
      sessionStorage.setItem('Allcontact', JSON.stringify(this.surchdata));

      
      this.Edit_Segment()


    }
  }

  ValidateAlpha(event: any) {

 

    var keyCode = (event.which) ? event.which : event.keyCode

 

    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;

    return true;

 

  }

}