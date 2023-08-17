import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompanyService } from 'src/app/features/company/service/company.service';

@Component({
  selector: 'app-email-template-main',
  templateUrl: './email-template-main.component.html',
  styleUrls: ['./email-template-main.component.css']
})
export class EmailTemplateMainComponent implements OnInit {
  showFiller = false;
  userDetails: any;
  companyId: any;
  companydata: any;

  constructor(
    private _shared: SharedService,
    private router: Router,
    private _route: ActivatedRoute,
    private CompanyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);

    // this.redirect();
  }
  url() {

    // this.router.navigateByUrl('/login')
    window.localStorage.clear();
    window.sessionStorage.clear();
    alert("Log out Successfully")
    this.router.navigate(['/login']);
    window.location.reload();
  }
  profile() {
    this.router.navigateByUrl('/profile')
    // alert("please fill the company details first")
    // if(this.companyId == null)
    // {
    //   this.router.navigateByUrl('/addcompany')
     
    // }
    // if(this.companyId!=null)
    // {
    //   this.router.navigateByUrl('/profile')
     
    // }
  }

  redirect() {

    this.userDetails = this._shared.getUserDetails();

    console.log('local', this.userDetails)

    // console.log('abc', this.userDetails.Company_Id);

    console.log('abc', this.userDetails.UserId);

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.companydata = data[0];
      console.log('check-status', this.companydata);

      this.companyId = this.companydata.company_Id;

      console.log(this.companyId)


      console.log(this.companydata.company_Id === this.companyId)

      if (this.companydata.company_Id === this.companyId) {
        this.router.navigate(['/editcompany'])
        console.log("navigated to edit page")
      }

      else {
        this.router.navigate(['/addcompany'])
        console.log("navigated to add page")
      }

    })
  }

}
