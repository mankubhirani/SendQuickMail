import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ApiEndpointsService } from "src/app/core/services/api-endpoints.service";
import { ApiHttpService } from "src/app/core/services/api-http.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {
  private apiUrl = environment.apiUrl;
  constructor(
    public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
  ) { }

  _getAllInfoApi(Obj: object) {
    // console.log( JSON.stringify(Obj));
  return this._apiHttpService.post(this._apiEndpointsService.getAllInfoEndpoint(),Obj) ;
  }
  
  updateProfile(updateData:object){
    // return this._http.put(`${this.apiUrl}/updateUserByUserId`
    return this._apiHttpService.put(
      this._apiEndpointsService.putUpdateProfileEndpoint()
    ,updateData)
  }

  changePassword(updateData:object){
    // return this._http.put(`${this.apiUrl}/updateUserByUserId`
    return this._apiHttpService.put(
      this._apiEndpointsService.putUpdateChangePasswordEndpoint()
    ,updateData)
  }
  
}
