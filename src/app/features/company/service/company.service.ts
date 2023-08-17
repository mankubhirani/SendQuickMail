import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ApiEndpointsService } from "src/app/core/services/api-endpoints.service";
import { ApiHttpService } from "src/app/core/services/api-http.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apiUrl;
  constructor(
    public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
  ) { }


  _getCountryApi() {
    return this._apiHttpService.get('https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json');
  }

  _postAddCompanyApi(addCompany: object) {

    console.log('addCompany', addCompany);

    return this._apiHttpService.post(
      this._apiEndpointsService.postAddCompanyEndpoint(), addCompany);

  }

  _getAllCompanyApi() {
    // return this._http.get(`${this.apiUrl}/getall`);
    return this._apiHttpService.get(
      this._apiEndpointsService.getAllCompanyEndpoint()
    );
  }

  getCompanyByid(id) {

    return this._apiHttpService
      .get(this._apiEndpointsService.getCompanyEndpoint(id));
  }

  getCompanyByuserId(id) {

    return this._apiHttpService
      .get(this._apiEndpointsService.getCompanyByEndpoint(id));
  }

  UpdateCompanyApi(editCompany: object) {
    console.log('addCompany', editCompany);

    return this._apiHttpService.post(
      this._apiEndpointsService.UpdateCompanyEndpoint(), editCompany);
  }

}
