import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import jwt_decode from "jwt-decode";
import { SharedService } from 'src/app/shared/services/shared.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // Variables for eye icon toggle
  type: string = "password";
  type1: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  eyeIcon1: string = "fa-eye-slash"

  // Variable to disable the button
  isDisabled: boolean;

  // Variable to store the original password
  original_Password: string = "";

  // Form control for email input field with validation
  email = new FormControl('', [Validators.required, Validators.email]);

  // Variable to check if the form is submitted
  submitted: any;

  // Sign-up form group
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public _data: ProfileService,
    private _router: Router,
    private _shared: SharedService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    // Set up form configurations
    this._preConfig();
  }

  // Function to initialize form configurations
  private _preConfig() {
    this._createSignUpForm();
  }

  // Function to create the sign-up form
  private _createSignUpForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]]
    }, { validators: this.passwordMatchValidator });
  }

  // Function to validate password match
  passwordMatchValidator(formGroup: FormGroup<any>) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirm_password')?.setErrors(null);
    }
  }

  // Function to get the form control by name
  getcontrol(name: any): AbstractControl | null {
    return this.signupForm.get(name);
  }

  // Getter for accessing the form controls
  get f() {
    return this.signupForm.controls;
  }

  // Function to handle sign-up form submission
  signup() {
    this.submitted = true;

    // Check if the password and confirm_password match
    if (this.signupForm.value.password != this.signupForm.value.confirm_password) {
      this._shared.ToastPopup('Password did not match with confirm password', '', 'error');
      return;
    }

    // Check if the form is valid and submitted
    if (this.submitted && this.signupForm.valid) {
      this.original_Password = this.signupForm.value.confirm_password;

      // Prepare data to send to the API
      let signUpData = {
        Name: this.signupForm.controls['name'].value,
        Username: this.signupForm.controls['username'].value,
        Email: this.signupForm.controls['email'].value,
        Password: this.signupForm.controls['password'].value,
      }

      // Call the sign-up API
      this.ngxService.start();
      this._data._postSignUpApi(signUpData).subscribe(
        (res: any) => {
          console.log("registered", res);
          this.ngxService.stop();
          if (res.success == true) {
            // Display success message and navigate to login page on successful registration
            this._shared.ToastPopup('Successfully', res.message, 'success');
            this._router.navigate(['/login']);
            this.signupForm.reset();
          } else {
            // Display error message on registration failure
            this._shared.ToastPopup('password', res.message, 'error');
          }
        }, (err) => {
          this.ngxService.stop();

          // Display error message if OTP is not found or there's an error in API call
          this._shared.ToastPopup('Please Enter Valid Data', '', 'error');
        })
    }
  }

  // Getter for accessing the form controls in template
  get signUpVail() {
    return this.signupForm.controls;
  }

  // Getter for accessing the name form control
  get firstnameVail() {
    return this.signupForm.get('name')
  }

  // Getter for accessing the username form control
  get lastnameVail() {
    return this.signupForm.get('username')
  }

  // Getter for accessing the email form control
  get emailVail() {
    return this.signupForm.get('email')
  }

  // Getter for accessing the mobile form control
  get mobileVail() {
    return this.signupForm.get('mobile')
  }

  // Getter for accessing the password form control
  get passwordVail() {
    return this.signupForm.get('password')
  }

  // Function to toggle password visibility
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  // Function to toggle confirm password visibility
  hideShow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon1 = "fa-eye" : this.eyeIcon1 = "fa-eye-slash";
    this.isText ? this.type1 = "text" : this.type1 = "password";
  }

  ValidateAlpha(event: any) {

    var keyCode = (event.which) ? event.which : event.keyCode

    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;

    return true;



  }
}
