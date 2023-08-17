import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EmailTemplateService } from '../../service/email-template.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {
  userDetails: any;
  Template: any;
  Template_body: any
  surchtext:string
  Template_Name:any
  
  template_Id:any
  sortedCollection: any[];


  // order: string = 'info.name';
  // reverse: boolean = false;
  // caseInsensitive: boolean = false;


  constructor(
    private orderPipe: OrderPipe,
    private _shared: SharedService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private EmailTemplateService: EmailTemplateService,

  ) {
    // this.sortedCollection = orderPipe.transform(this.Template, 'Template.template_Name');
    // console.log(this.sortedCollection);

   }

  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);

    console.log("UserId", this.userDetails.UserId);

    this.AllList();
  }

  AllList() {

    this.EmailTemplateService.getTemplate().subscribe((data: any) => {

      this.Template = data;

      this.setOrderAtoZ() ;
      console.log('data', this.Template);

    });
    
  }

  onClick(Item: any) {

    console.log('clicked', Item.body);

    this.Template_body = Item.body

    this.Template_Name = Item.template_Name

    console.log(this.Template_Name)

    sessionStorage.setItem('manku', this.Template_body);
    sessionStorage.setItem('template', this.Template_Name);


  }

  delettemp(template_Id){
    console.log(template_Id)

 this.ngxService.start();

 // if (confirm('Are you sure to delete this details?')) {

 this.EmailTemplateService.delettemplate(template_Id).subscribe(async (result) => {

   this.ngxService.stop();

   console.log('deleted successfully');

   alert('Deleted successfully');

   setTimeout(() => {

     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['email-template']));

   }, 1000);

 });

  }

  // setOrder(value: string) {
  //   if (this.order === value) {
  //     this.reverse = !this.reverse;
  //   }

  //   this.order = value;
  // }

  setOrderAtoZ() {
  
    let Template = this.Template.sort((a, b) => {
      if (a.template_Name < b.template_Name) {
          return -1;
      }
      if (a.template_Name > b.template_Name) {
          return 1;
      }
      return 0;
  });
  
  console.log(Template);

}

setOrderZtoA() {
  

     
  let Template = this.Template.sort((a, b) => {
    if (b.template_Name < a.template_Name) {
        return -1;
    }
    if (b.template_Name > a.template_Name) {
        return 1;
    }
    return 0;
});

console.log(Template);

}


}

