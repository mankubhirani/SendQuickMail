import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AllContactService } from '../../service/all-contact.service';
import { CompanyService } from 'src/app/features/company/service/company.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {
  Contact: any;
  getAllContact: any;
  length: any;
  newArray_contact: any;
  userDetails: any;
  emaildata: any;
  UserEmailObj: any;
  finaldata: any = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 20, 50, 100];
  id: any;
  companyId: number;

  constructor(
    private _shared: SharedService,
    private AllContactService: AllContactService,
    private CompanyService: CompanyService,
  ) { }

  ngOnInit(): void {
    // Get user details on component initialization
    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);
    console.log("UserId", this.userDetails.UserId);

    // Fetch data for the user's company and contacts
    this.AllList();
  }

  AllList() {
    // Fetch data for the company associated with the user
    this.CompanyService.getCompanyByuserId(this.userDetails.UserId).subscribe((data: any) => {
      this.Contact = data[0]; // Store the company data in Contact variable
      console.log('check-status', this.Contact);
      console.log('company_Id', this.Contact.company_Id);

      // Prepare id object to use in the next API call
      this.id = {
        "company_Id": this.Contact.company_Id
      }
      console.log('id', this.id);

      // Prepare UserEmailObj object to use in the next API call
      this.UserEmailObj = { contact_Email: this.userDetails.Email }

      // Fetch data for all contacts associated with the user's email
      this.AllContactService._getbyUserEmail(this.UserEmailObj).subscribe((data: any) => {
        this.emaildata = data.data; // Store the email data in emaildata variable
        console.log("emaildata", this.emaildata)

        // Extract user details from the emaildata and push them into the finaldata array
        for (let i of this.emaildata) {
          console.log(i.user_Details)
          for (let k of i.user_Details) {
            this.finaldata.push(k)
          }
        }

        this.getAllContact = data;
        console.log('Contact List', this.getAllContact);
        console.log('Contact', this.getAllContact.data);

        // Filter the data to get only active contacts (IsActive === 1) and store them in newArray_contact
        this.newArray_contact = this.getAllContact.data.filter(element => element.IsActive === 1);
        console.log('Active True', this.newArray_contact);
      });
    });
  }

  // Function to handle pagination
  onTabledataChange(event: any) {
    this.page = event;
    // this.AllList(); // This line seems to be commented out; it might be necessary for updating the table data on page change.
    this.newArray_contact // It looks like this line should update the table data based on the selected page.
  }

  // Function to handle table size change
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.AllList(); // This line seems to be commented out; it might be necessary for updating the table data on table size change.
    this.newArray_contact // It looks like this line should update the table data based on the selected table size.
  }
}
