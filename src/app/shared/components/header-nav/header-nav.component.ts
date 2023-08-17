import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompanyService } from 'src/app/features/company/service/company.service';
import { log } from 'console';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
  showFiller = false;
  userDetails: any;
  cid: any;
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

    // console.log('abc', this.userDetails.Company_Id);
    
    this.redirect();
  }

  url() {

    this.router.navigateByUrl('/login')
  }
  profile() {
    this.router.navigateByUrl('/profile')
  }

  redirect() {

    this.userDetails = this._shared.getUserDetails();

    console.log('local', this.userDetails)

    // console.log('abc', this.userDetails.Company_Id);

    console.log('abc', this.userDetails.UserId);

    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {

      this.companydata = data[0];
      console.log('check-status', this.companydata);

      this.cid = this.companydata.company_Id;

      console.log(this.cid)


      console.log(this.companydata.company_Id === this.cid)

      if (this.companydata.company_Id === this.cid) {
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
