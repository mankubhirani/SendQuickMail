import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SegmentService } from '../../service/segment.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css']
})
export class SegmentComponent implements OnInit {
  segment: any;
  userDetails: any;
  
  constructor(
    private SegmentService: SegmentService,
    private _shared: SharedService,
    private router: Router,
  ) { }




  ngOnInit(): void {

    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);

    console.log("UserId", this.userDetails.UserId);

    let id = {
      "UserId" : this.userDetails.UserId
    }

    console.log("UserId", id);

    this.SegmentService._getbyUSERidSegmentApi(id).subscribe((res:any) => {
    // this.SegmentService._getSegmentApi().subscribe((res) => {
      this.segment = res.data[0];
      console.log('segment', this.segment);

    })
  }

  editSegment(Item: any) {

    console.log('value', Item)

    this.SegmentService.segmentForEdit = Item;

    let set = Item;

    sessionStorage.setItem('abc', JSON.stringify(set)); 

    this.router.navigate(['/edit-segment'])

  }

  // deleteSegment(Item) {
  //   let Id = Item.segment_Id
  //   console.log(Item.segment_Id)

  //   this.SegmentService._deleteSegmentApi(Id).subscribe((res) => {
  //     console.log(JSON.stringify(res));

  //     this._shared.ToastPopup('deleted Successfully', 'Segment', 'success');
  //     this.SegmentService._getSegmentApi().subscribe((res) => {
  //       this.segment = res;
  //       console.log('segment', this.segment);

  //     })
  //     // this.router.navigateByUrl("/reload")

  //   })
  // }

  deleteSegment(Item: any) {

    let Id = Item.segment_Id

    console.log('Segment', Item.segment_Id);

    this.SegmentService._deleteSegmentApi(Id).subscribe((data) => {

      this._shared.ToastPopup('deleted Successfully', 'Segment', 'success');

      window.location.reload();

      // this.segment = data[0];
    
    });
   

  }

}
