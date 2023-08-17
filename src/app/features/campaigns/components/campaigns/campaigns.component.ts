import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  currentDate:any
  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {

    this. currentDate = new Date();
// console.log(currentDate);
  }

  url(){
    this._router.navigateByUrl('/campaigns')
  }

}
