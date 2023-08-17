import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-view',
  templateUrl: './template-view.component.html',
  styleUrls: ['./template-view.component.css']
})
export class TemplateViewComponent implements OnInit {
  Gettemplatedata: any

  constructor() { }



  ngOnInit(): void {
    this.Gettemplatedata = sessionStorage.getItem("manku");

    console.log(this.Gettemplatedata,)
  }



}
