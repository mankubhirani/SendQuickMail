import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment';
import { ApiEndpointsService } from "src/app/core/services/api-endpoints.service";
import { ApiHttpService } from "src/app/core/services/api-http.service";

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  private apiUrl = environment.apiUrl;
  constructor(
    public _http: HttpClient,
    private _apiHttpService: ApiHttpService,
    private _apiEndpointsService: ApiEndpointsService,
  ) { }

  segmentForEdit:null;

  _postSegmentApi(addSegment: object) {
    return this._apiHttpService.post(this._apiEndpointsService.postSegmentEndpoint(), addSegment);
  }

  _deleteSegmentApi(id) {
    return this._apiHttpService.delete(this._apiEndpointsService.deleteSegmentEndpoint(id));
  }

  _getSegmentApi() {
    return this._apiHttpService.get(this._apiEndpointsService.getSegmentEndpoint());
  }

  _getbyidSegmentApi(id:object) {
    return this._apiHttpService.post(this._apiEndpointsService.getbyidSegmentEndpoint(),id);
  }

  _getbyUSERidSegmentApi(id:object) {
    return this._apiHttpService.post(this._apiEndpointsService.getbyUSERidSegmentEndpoint(),id);
  }

  _editSegmentApi(addSegment: object) {
    return this._apiHttpService.put(this._apiEndpointsService.editSegmentEndpoint(), addSegment);
  }

  _filtercontactApi(con: object) {
    return this._apiHttpService.post(this._apiEndpointsService.filterEndpoint(), con);
  }

}
