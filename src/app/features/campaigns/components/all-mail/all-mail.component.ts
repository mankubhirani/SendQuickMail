import { Component, OnInit } from '@angular/core';
import { CampaignsService } from '../../service/campaigns.service';
import { SharedService } from 'src/app/shared/services/shared.service';



@Component({
  selector: 'app-all-mail',
  templateUrl: './all-mail.component.html',
  styleUrls: ['./all-mail.component.css']
})
export class AllMailComponent implements OnInit {
  CampID:any

  Campaign:any
  UserId:any
  UserIdk:any;
  userInfo: any;
  Campaigndata:any
  constructor(private CampaignsService: CampaignsService, private _shared: SharedService,) { 
    


  }

  ngOnInit(): void {
    this.userInfo= this._shared.getUserDetails();
	
// this.userInfo =JSON.parse(sessionStorage.getItem('userDetails'));
this.Campaigndata= this.userInfo
console.log('this.userInfo',this.userInfo.UserId);
// this.UserIdthis.userInfo.UserId

this.Campaigns()

  }


  


  Campaigns() {

     this.UserIdk = {
      UserId:this.userInfo.UserId

     }
    this.CampaignsService._getcompaigns(this.UserIdk).subscribe((res: any) => {

      this.Campaign = res.data[0]

      console.log("UYUFYUFUYFFH", this.Campaign)

    })
  }

  onClick(Item:any) {

    console.log('clicked', Item);

    this.Campaigndata = Item

    this.CampID = this.Campaigndata.campaign_Id

     console.log(this.CampID)

    sessionStorage.setItem('camID', this.CampID);
    // sessionStorage.setItem('template', this.abc);
  }


  setOrderAtoZ() {
  
    let Template = this.Campaign.sort((a, b) => {
      if (a.created_date < b.created_date) {
          return -1;
      }
      if (a.created_date > b.created_date) {
          return 1;
      }
      return 0;
  });
  
  console.log(Template);

}

}
