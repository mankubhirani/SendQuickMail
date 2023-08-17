import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ApiEndpointsService } from "src/app/core/services/api-endpoints.service";
import { ApiHttpService } from "src/app/core/services/api-http.service";

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  private apiUrl = environment.apiUrl;
  constructor(
    public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
  ) { }


  getTemplate() {

    return this._apiHttpService
      .get(this._apiEndpointsService.getAllTemplateEndpoint());
  }
  
  updatetemplate(loginData: object) {
    return this._apiHttpService.put(
      this._apiEndpointsService.updatetemplate(),
      loginData
    )
  }

  delettemplate(template_Id: any) {
    return this._apiHttpService.delete(
      this._apiEndpointsService.deletetemplate(template_Id))
  }
}
