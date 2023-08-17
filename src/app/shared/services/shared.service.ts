import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {



  isisExpandedNavSideBar = new BehaviorSubject(true);
  userUpdated = new Subject();
  headerTabOptionSelected = new Subject();
  constructor(
    private _toastr: ToastrService,

  ) { }



  ToastPopup(errorMsg: string, errorModule: string, errorType: string) {
    switch (errorType) {
      case 'error':
        this._toastr.error(errorMsg, errorModule, {
          progressBar: true
        });
        break;
      case 'info':
        this._toastr.info(errorMsg, errorModule, {
          progressBar: true
        });
        break;
      case 'success':
        this._toastr.success(errorMsg, errorModule, {
          progressBar: true
        });
        break;
    }
  }


  getJWTToken() {
    return sessionStorage.getItem('res');
    // return localStorage.setItem('data', JSON.stringify(set));
  }

  setJWTToken(res: string) {
    sessionStorage.setItem('res', res);
  }

  removeJWTToken() {
    localStorage.removeItem('res');
    localStorage.removeItem('data');
    sessionStorage.removeItem('data');
  }

  getUserDetails() {
    return JSON.parse(sessionStorage.getItem('userDetails') || '{}');

  }

  setUserDetails(userDetails: any) {
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
    
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || '{}');

  }

  setUser(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    
  }

  removeUserDetails() {
    localStorage.removeItem('userDetails');
    sessionStorage.removeItem('userDetails');
  }
}

