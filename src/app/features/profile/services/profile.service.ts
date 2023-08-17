import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ApiEndpointsService } from "src/app/core/services/api-endpoints.service";
import { ApiHttpService } from "src/app/core/services/api-http.service";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // private apiUrl = environment.apiUrl;
  constructor(
    public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
    )
   { }

  // _postLoginApi(loginBody: object){
  //   return this._http.post(`${this.apiUrl}/login`,loginBody);
    
  // }
  _postSignUpApi(signupBody: object){
    return this._apiHttpService.post(
      this._apiEndpointsService.getSignUpEndpoint(),
      signupBody
    )
  }
  _postLoginApi(loginBody: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.getLoginEndpoint(),
      loginBody
    )
  }

  postforget(email: object){
    return this._apiHttpService.post(
      this._apiEndpointsService.forgetpass(),
      email
    )
  }

  postOTP(loginData: object){
    return this._apiHttpService.put(
      this._apiEndpointsService.forgetOTP(),
      loginData
    )
  }
}
