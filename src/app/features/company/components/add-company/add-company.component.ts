import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompanyService } from '../../service/company.service';
import timezone from '../../../../file/timezone.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  addCompany: FormGroup;
  userDetails: any;
  getAllCountry: any;
  timeZone: { offset: string, name: string }[] = timezone;

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    private _companyService: CompanyService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    // Get user details
    this.userDetails = this._shared.getUserDetails();

    // Initialize the addCompany form with form controls and validations
    this.addCompany = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      companyEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      companyURL: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      Phone_Number: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      Number_of_Employe: ['', [Validators.required]],
      city: [''],
      region: [''],
      zip: [''],
      streetAddress: [''],
      timeZone: [''],
      adddress: ['',],
      remark: [''],
      companyLocation: ['', [Validators.required]],
    });

    // Fetch all country data
    this._companyService._getCountryApi().subscribe((res) => {
      this.getAllCountry = res;
      console.log(" GET country ", this.getAllCountry);
    });
  }

  // Getters for companyVail form controls
  get companyVail() {
    return this.addCompany.controls;
  }

  // Function to clear form fields
  clear() {
    this.addCompany.reset();
  }

  // Function to register a new company
  resisterCompany() {
    // Prepare data to be sent for registration
    let saveCompanyData = {
      companyName: this.addCompany.controls['companyName'].value,
      companyEmail: this.addCompany.controls['companyEmail'].value,
      companyURL: this.addCompany.controls['companyURL'].value,
      Phone_Number: this.addCompany.controls['Phone_Number'].value,
      Number_of_Employe: this.addCompany.controls['Number_of_Employe'].value,
      remark: this.addCompany.controls['remark'].value,
      companyLocation: this.addCompany.controls['companyLocation'].value,
      UserId: this.userDetails.UserId,
      isActive: 1,
    }

    console.log('saveCompanyData', saveCompanyData);

    // Call the API to register the new company
    this._companyService._postAddCompanyApi(saveCompanyData).subscribe((res: any) => {
      // Display success message and navigate to dashboard on success
      if (res) {
        console.log(res);
        console.log(res.message);
        if (res.message === "Added Succesfully") {
          this._shared.ToastPopup('Registered Successfully', '', 'success');
          setTimeout(() => {
            this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => this._router.navigateByUrl('/dashboard'));
          }, 2000);
        }
      }
    });
  }

  // Function to allow only numeric input for Phone_Number field
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  // Function to allow only alphabetic input
  ValidateAlpha(event: any) {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)
      return false;
    return true;
  }
}
