import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProfileUserService } from '../../service/profile-user.service';
import { CompanyService } from 'src/app/features/company/service/company.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  userDetails: any;
  body: any
  changePassword: any = FormGroup;
  editProfile: any = FormGroup;

  companydata: any;
  type: string = "password";
  type1: string = "password";
  type2: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  eyeIcon1: string = "fa-eye-slash";
  eyeIcon2: string = "fa-eye-slash"
  signUpVail: any;

  constructor(
    private _profile: ProfileUserService,
    private _shared: SharedService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private _companyService: CompanyService,

  ) { }

  url() {

    this._router.navigate(['/dashboard'])
  }

  get f() { return this.editProfile.controls; }

  get g() { return this.changePassword.controls; }

  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();

    console.log(this.userDetails);

    console.log('UserId', this.userDetails.UserId);

    let Id =
    {
      UserId: this.userDetails.UserId
    }
    console.log('Get users Info', Id);

    // this._companyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {
    //   this.companydata = data[0];
    //   console.log('companydata', this.companydata);
    //   // console.log('UserId', this.companydata.UserId);
    // });

    this.editProfile = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      UserPhoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      companyLocation: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),

    })

    this._profile._getAllInfoApi(Id).subscribe((res: any) => {

      this.userInfo = res.data;

      console.log('Get', this.userInfo);

      console.log('UserId', this.userInfo.UserId);

      console.log('Name', this.userInfo.Name);

      console.log('Email', this.userInfo.Email);

      console.log('companyName', this.userInfo.companyDetails[0].companyName);

      console.log('companyLocation', this.userInfo.companyDetails[0].companyLocation);

      console.log('Phone_Number', this.userInfo.companyDetails[0].Phone_Number);

      console.log('UserPhoneNo', this.userInfo.UserPhoneNo);



      this.editProfile.patchValue({

        Name: this.userInfo.Name,
        Email: this.userInfo.Email,
        companyName: this.userInfo.companyDetails[0].companyName,
        companyLocation: this.userInfo.companyDetails[0].companyLocation,
        UserPhoneNo: this.userInfo.UserPhoneNo,

      });

    })

    this.changePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      // newPassword: ['', [Validators.required]],
      
      newPassword: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]], 
      confirmPassword: new FormControl(null, [(c: AbstractControl) => Validators.required(c),Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),]),
      // confirmPassword: ['', [Validators.required]],
    },{ validators: this.passwordMatchValidator })
    

  }

  passwordMatchValidator(formGroup: FormGroup<any>) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }


  getcontrol(name: any): AbstractControl | null {

    return this.changePassword.get(name)


  }



  get passwordVail() {
    return this.changePassword.controls;
  }
  get editProfileVail() {
    return this.editProfile.controls;
  }

  // savepassword() {
  //   let savePass = {
  //     currentPassword: this.changePassword.controls['currentPassword'].value,
  //     newPassword: this.changePassword.controls['currentPassword'].value,
  //   }
  //   console.log(savePass);
  // }

  savepassword() {
    console.log("changePassword", this.changePassword.value);

    // console.log("savePass",this.changePassword.newPassword.value);
    if (this.changePassword.controls['newPassword'].value == this.changePassword.controls['confirmPassword'].value) {
      console.log("confirm password same")

      let savePass = {
        UserId: this.userDetails.UserId,
        oldPassword: this.changePassword.controls['oldPassword'].value,
        newPassword: this.changePassword.controls['newPassword'].value,
      }

      console.log("Check Password", savePass);

      this._profile.changePassword(savePass).subscribe((res: any) => {
        console.log('done', res);
        if (res.success == true) {
          this._shared.ToastPopup(res.message, '', 'success');
          window.location.reload();
        } else {
          this._shared.ToastPopup(res.message, '', 'error');

        }

      })
    }

    else {
      alert("New Password and Confirm Password are not same...")
    }


    // console.log("savePass",this.user_id);





  }




  EditProfile() {

    console.log("addProject", this.editProfile.value);

    let saveData = {

      UserId: this.userDetails.UserId,
      Username: this.userDetails.Username,
      UserPhoneNo: this.editProfile.value.UserPhoneNo,
      Name: this.editProfile.value.Name,
      Email: this.editProfile.value.Email,
      companyName: this.editProfile.value.companyName,
      companyLocation: this.editProfile.value.companyLocation,
      Phone_Number: this.userInfo.companyDetails[0].Phone_Number,
      Designation: this.userInfo.Designation,
      UserIsActive: 1,
      companyEmail: this.userInfo.companyDetails[0].companyEmail,
      companyURL: this.userInfo.companyDetails[0].companyURL,
      remark: this.userInfo.companyDetails[0].remark,
      company_Id: this.userInfo.companyDetails[0].company_Id,
      // CompanyIsActive: 1,
    }

    console.log("check", saveData);
    // sessionStorage.setItem('userDetails', JSON.stringify(saveData)); 

    this._profile.updateProfile(saveData).subscribe((res: any) => {
      console.log('done', res);

      if (res.success == true) {
        this._shared.ToastPopup(res.message, '', 'success');
        // this._shared.setUser(res['data'][0]);
        this._router.navigate(['profile']);
        // sessionStorage.removeItem('user');

        window.location.reload();
      } else {
        this._shared.ToastPopup(res.message, '', 'error');

      }

    })

  }


  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ValidateAlpha(event: any) {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;
    return true;
  }

  // checkPasswords(newPassword: string, renewPassword: string) {
  //   this.isConfirmPasswordDirty = true;
  //   if (newPassword == renewPassword) {
  //     this.passwordsMatching = true;
  //     this.confirmPasswordClass = 'form-control is-valid';
  //   } else {
  //     this.passwordsMatching = false;
  //     this.confirmPasswordClass = 'form-control is-invalid';
  //   }
  // }


  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  hideShow() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon1 = "fa-eye" : this.eyeIcon1 = "fa-eye-slash";
    this.isText ? this.type1 = "text" : this.type1 = "password";
  }
  hidePass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon2 = "fa-eye" : this.eyeIcon2 = "fa-eye-slash";
    this.isText ? this.type2 = "text" : this.type2 = "password";
  }

}
