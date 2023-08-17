import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class Constants {

    public readonly API_ENDPOINT: string = environment.apiUrl;
    public readonly API_MOCK_ENDPOINT: string = environment.apiMockUrl;
    public readonly API_IS_DEVELOPMENT_ENV: boolean = environment.production;

    // profile
    public readonly API_ENDPOINT_SIGN_UP: string = 'inviteuser/'
    
    public readonly API_ENDPOINT_LOGIN: string = 'login/'

    // dashboard
    public readonly API_ENDPOINT_ADD_COMPANY: string = 'create/'

    public readonly API_ENDPOINT_UPDATE_COMPANY: string = 'company/'

    public readonly API_ENDPOINT_All_COMPANY: string = 'company/getAll/'

    public readonly API_ENDPOINT_BYID_COMPANY: string = 'company/'

    public readonly API_ENDPOINT_BY_USER_ID_COMPANY: string = 'companyby/'

    public readonly API_ENDPOINT_ADD_SUBSCRIBER: string = 'contact/'

    public readonly API_ENDPOINT_UNSUBSCRIBER: string = 'ContactUnSubscribe/ByEmail/'

    public readonly API_ENDPOINT_All_CONTACT: string = 'GetAllContactDetails/'

    public readonly API_ENDPOINT_COMPANY_ID_BY_CONTACT: string = 'GetContactDetails/companyId=?/'


    public readonly API_ENDPOINT_UserEmail: string = 'GetContactEmails/contact_Email=?'

    public readonly API_ENDPOINT_BY_USER_ID_LIST: string = 'listby/'

    public readonly API_ENDPOINT_UPDATE_PROFILE: string = 'updateUserByUserId/'

    public readonly API_ENDPOINT_CHANGE_PASSWORD_PROFILE: string = 'ChangePassword/ByUserId/'

    public readonly API_ENDPOINT_SEGMENT: string = 'Segment/'

    public readonly API_ENDPOINT_GET_SEGMENT: string = 'getSegment/'

    public readonly API_ENDPOINT_EDIT_SEGMENT: string = 'UpdateSegment/'

    public readonly API_ENDPOINT_ALL_INFO: string = 'allCompaniesByUserId/UserId:UserId/'
    
    public readonly API_ENDPOINT_DELETE_SEGMENT: string = 'DeleteSegment'


    public readonly API_ENDPOINT_COUNT_All_CONTACT: string = 'GetContactDetails/created_Date=?/'

    public readonly API_ENDPOINT_BY_ID_SEGMENT: string = 'getSegment/segmentId=?/'

    public readonly API_ENDPOINT_BY_USER_ID_SEGMENT: string = 'getSegment/UserId=?/'
    
    public readonly API_ENDPOINT_ADD_CAMPAIGNS: string = 'Campaign/'

    public readonly API_ENDPOINT_ADD_CAMPAIGNS_MAIl: string = 'NewCampaign/'
    public readonly API_ENDPOINT_UPDATE_CAMPAIGNS_MAIl: string = 'UpdateCampaign/'


    public readonly API_ENDPOINT_GET_CAMPAIGNS_MAIl: string = 'GetContactEmails/companyId=?/'

    public readonly API_ENDPOINT_SEARCH_CONTACT: string = 'search'

    public readonly API_ENDPOINT_GET_ALL_TEMPLATE: string = 'getTemplate/'

    public readonly API_ENDPOINT_GET_USER: string = 'GetEmailDetails/UserId=?'

    public readonly API_ENDPOINT_COUNTRY: string = 'getAllCountry'

    public readonly API_ENDPOINT_ADD_STATE: string = 'GetStateDetails/country_id=?'

    public readonly API_ENDPOINT_ADD_CITY: string = 'GetCityDetails/state_id=?'

    public readonly API_ENDPOINT_GET_COMPAIGNS: string = 'GetCampaign/UserId=?'

    public readonly API_ENDPOINT_GET_COMPAIGNS_byCamID: string = 'GetCampaign/campaign_Id=?'


    public readonly API_TEMPLATE_UPDATE: string = 'UpdateTemplate'

    public readonly API_TEMPLATE_DELET: string = 'DeleteTemplate'


    // forget

    public readonly API_ENDPOINT_FORGET: string = 'forgot-password/'


    public readonly API_ENDPOINT_OTP: string = 'forgetbyotp'


    // GETSEDULE


    public readonly API_ENDPOINT_GET_SHEDULE: string = 'getScheduler/Id=?'


    
}