import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ApiEndpointsService } from "src/app/core/services/api-endpoints.service";
import { ApiHttpService } from "src/app/core/services/api-http.service";

@Injectable({
  providedIn: 'root'
})
export class AllContactService {
  private apiUrl = environment.apiUrl;
  constructor(
    public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
  ) { }

  _getCountryApi() {
    return this._apiHttpService.get(this._apiEndpointsService.getCountry());
  }

  _postAddSubscriberApi(addSubscriber: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.postAddSubscriberEndpoint(), addSubscriber);
  }

  _postState(State: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.postStateEndpoint(), State);
  }
  _postCity(State: object) {
    return this._apiHttpService.post(
      this._apiEndpointsService.postCityEndpoint(), State);
  }


  _getAllContactApi() {
    // return this._http.get(`${this.apiUrl}/getall`);
    return this._apiHttpService.get(
      this._apiEndpointsService.getAllContactEndpoint()
    );
  }

  getCompanyByuserId(id) {

    return this._apiHttpService
      .get(this._apiEndpointsService.getListByEndpoint(id));
  }

  unSubscriberApi(unSubscriber: object) {
    return this._apiHttpService.put(
      this._apiEndpointsService.putUnSubscriberEndpoint(), unSubscriber);
  }

  _getbyCompanyid(id:object) {
    return this._apiHttpService.post(this._apiEndpointsService.getBYContactListEndpoint(),id);
  }


  _getbyUserEmail(k) {
    return this._apiHttpService.post(this._apiEndpointsService.publicUserEmailEndpoint(),k);
  }


}
