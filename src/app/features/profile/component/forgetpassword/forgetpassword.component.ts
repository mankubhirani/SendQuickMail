import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from 'src/app/shared/services/shared.service';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  forgetForm!: FormGroup;


  getcontrol(name: any): AbstractControl | null {
    return this.forgetForm.get(name);
  }

  constructor(private fb: FormBuilder,
    

    private router: Router,
    private ngxService: NgxUiLoaderService,
    private ProfileService: ProfileService,
    private shared: SharedService
  ) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {


  }



  forget() {


    let email = {
      "email": this.forgetForm.controls['email'].value,
    };

    console.log('ok mohit', email);
    // Add your logic here to handle the form submission
    this.ngxService.start();
    this.ProfileService.postforget(email).subscribe((res: any) => {
      this.ngxService.stop();

      if(res.error== "User not found"){

        this.shared.ToastPopup('User not found', '', 'Error');

      }
      this.shared.ToastPopup('OTP SEND SUCCESSFUL', '', 'succ');

      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/otp']));
      }, 2000);

    },
    (err) => {
      this.ngxService.stop();

      // Display error message if OTP is not found or there's an error in API call
      this.shared.ToastPopup('User not found', '', 'error');
    })

    // this._router.navigate(['/otp'])


  }


}
