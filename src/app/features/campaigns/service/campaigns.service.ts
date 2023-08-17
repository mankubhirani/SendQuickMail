import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ApiEndpointsService } from "src/app/core/services/api-endpoints.service";
import { ApiHttpService } from "src/app/core/services/api-http.service";


@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private apiUrl = environment.apiUrl;
  constructor(
    public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
  ) { }

  _CreateCamApi(addcam: object) {

    console.log('addCam', addcam);

    return this._apiHttpService.post(
      this._apiEndpointsService.postCreateCamEndpoint(), addcam);

  }

  _CreateCampaignsApi(cam: object) {

    console.log('Cam', cam);

    return this._apiHttpService.post(
      this._apiEndpointsService.postCreateCampaignsEndpoint(), cam);

  }


  _updateCampaignsApi(cam: object) {

    // console.log('Cam', cam);

    return this._apiHttpService.put(
      this._apiEndpointsService.putCreateCampaignsEndpoint(), cam);

  }

  _getbycontactEmailApi(id: object) {
    return this._apiHttpService.post(this._apiEndpointsService.getbyEmailEndpoint(), id);
  }

  _getuser(jkl: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.getuserEndpoint(), jkl);
  }


  _getcompaigns(UserIdk: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.compaignsEndpoint(), UserIdk);
  }

  getScheduler(UserId: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.getsedule(), UserId);
  }

  _getcompaignsdata(UserIdk: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.compaignsgetEndpoint(), UserIdk);
  }


  

}
