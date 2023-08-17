import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-contacts',
  templateUrl: './import-contacts.component.html',
  styleUrls: ['./import-contacts.component.css']
})
export class ImportContactsComponent implements OnInit {

  constructor(  private router :Router) { }

  ngOnInit(): void {
  }

  url(){
    this.router.navigate(['allContact/importContact/upload'])

  }



}
