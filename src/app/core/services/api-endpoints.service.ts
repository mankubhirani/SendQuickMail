// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '../../shared/classes/url-builder';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';

// Application Constants
import { Constants } from 'src/app/config/constant';

@Injectable()
export class ApiEndpointsService {
  constructor(
    // Application Constants
    private _constants: Constants
  ) { }
  /* #region URL CREATOR */
  // URL
  private createUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this._constants.API_MOCK_ENDPOINT :
        this._constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }
  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParametersExclude(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `${encodeURIComponent(pathVariable.toString())}/`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
  /* #endregion */

  private createPostInstallUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this._constants.API_MOCK_ENDPOINT :
        '',
      action
    );
    return urlBuilder.toString();
  }

  //Example

  //   public getNewsEndpoint(): string {
  //     return this.createUrl('news');
  //   }

  //   This method will return:
  //    https://domain.com/api/news


  //   public getNewsEndpoint(): string {
  //     return this.createUrl('news', true);
  //   }

  //   This method will return:
  //   https://mock-domain.com/api/news


  //   public getProductListByCountryAndPostalCodeEndpoint(
  //     countryCode: string, 
  //     postalCode: string
  //   ): string {
  //     return this.createUrlWithQueryParameters(
  //       'productlist', 
  //       (qs: QueryStringParameters) => {
  //         qs.push('countryCode', countryCode);
  //         qs.push('postalCode', postalCode);
  //       }
  //     );
  //   }

  //   This method will return:
  //   https://domain.com/api/productlist?countrycode=en&postalcode=12345


  //   public getDataByIdAndCodeEndpoint(
  //     id: string,
  //     code: number
  //   ): string {
  //     return this.createUrlWithPathVariables('data', [id, code]);
  //   }

  //   This method will return:
  //   https://domain.com/api/data/12/67


  // Now, let’s go to a component and use them all together.

  // constructor(
  //   // Application Services
  //   private apiHttpService: ApiHttpService,
  //   private apiEndpointsService: ApiEndpointsService
  // ) {
  //     ngOnInit() {
  //     this.apiHttpService
  //       .get(this.apiEndpointsService.getNewsEndpoint())
  //       .subscribe(() => {
  //         console.log('News loaded'))
  //       });
  // }
  public getSignUpEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_SIGN_UP);
  }

  public getLoginEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_LOGIN);
  }

  public postAddSubscriberEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ADD_SUBSCRIBER);
  }

  public putUnSubscriberEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_UNSUBSCRIBER);
  }

  public postAddCompanyEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ADD_COMPANY);
  }

  public UpdateCompanyEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_UPDATE_COMPANY);
  }

  public getAllCompanyEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_All_COMPANY);
  }

  public getCompanyEndpoint(id) {
    return this.createUrl(this._constants.API_ENDPOINT_BYID_COMPANY + id) + '/';
  }

  public getCompanyByEndpoint(id) {
    return this.createUrl(this._constants.API_ENDPOINT_BY_USER_ID_COMPANY + id) + '/';
  }

  public getAllContactEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_All_CONTACT);
  }

  public getBYContactListEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_COMPANY_ID_BY_CONTACT);
  }

  publicUserEmailEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_UserEmail);
  }

  public getListByEndpoint(id) {
    return this.createUrl(this._constants.API_ENDPOINT_BY_USER_ID_LIST + id) + '/';
  }

  public postSegmentEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_SEGMENT);
  }
  public getSegmentEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_SEGMENT);
  }

  public getbyidSegmentEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_BY_ID_SEGMENT);
  }

  public getbyUSERidSegmentEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_BY_USER_ID_SEGMENT);
  }

  public editSegmentEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_EDIT_SEGMENT);
  }

  public getAllInfoEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ALL_INFO);
  }
  public deleteSegmentEndpoint(id): string {
    return this.createUrl(this._constants.API_ENDPOINT_DELETE_SEGMENT + '/' + id) + '/';
  }
  public putUpdateProfileEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_UPDATE_PROFILE)
  }

  public putUpdateChangePasswordEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_CHANGE_PASSWORD_PROFILE)
  }

  public getContactBYdateEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_COUNT_All_CONTACT);
  }


  public postCreateCamEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ADD_CAMPAIGNS);
  }

  public postCreateCampaignsEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ADD_CAMPAIGNS_MAIl);
  }

  public putCreateCampaignsEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_UPDATE_CAMPAIGNS_MAIl);
  }

  public getbyEmailEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_CAMPAIGNS_MAIl);
  }

  public filterEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_SEARCH_CONTACT);
  }

  public getAllTemplateEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_ALL_TEMPLATE);
  }

  public getuserEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_USER);
  }
 
  public getCountry(): string {
    return this.createUrl(this._constants.API_ENDPOINT_COUNTRY);
  }

  
  public postStateEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ADD_STATE);
  }
  public postCityEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_ADD_CITY  );
  }

  public compaignsEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_COMPAIGNS);
  }

  public updatetemplate(): string {
    return this.createUrl(this._constants.API_TEMPLATE_UPDATE);
  }
  
  public deletetemplate(template_Id:any): string {
    return this.createUrl(this._constants.API_TEMPLATE_DELET + '/' + template_Id);
  }

  public forgetpass(): string {
    return this.createUrl(this._constants.API_ENDPOINT_FORGET);
  }

  public forgetOTP(): string {
    return this.createUrl(this._constants.API_ENDPOINT_OTP);
  }

  public getsedule(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_SHEDULE);
  }

  public compaignsgetEndpoint(): string {
    return this.createUrl(this._constants.API_ENDPOINT_GET_COMPAIGNS_byCamID);
  }

}