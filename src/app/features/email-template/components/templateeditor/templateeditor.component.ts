import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmailTemplateService } from '../../service/email-template.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-templateeditor',
  templateUrl: './templateeditor.component.html',
  styleUrls: ['./templateeditor.component.css']
})
export class TemplateeditorComponent implements OnInit {
  Gettemplatedata: any;
  StoreTemplateData: any;
  abcd: any
  htmlContent = "";
  userDetails: any
  loginForm!: FormGroup;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '6rem', // Set the initial minimum height
    maxHeight: 'auto', // Allow the height to adjust based on content
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: ''
  };

  @Output() htmlContentChanged: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editor') editor: ElementRef;


  constructor(private fb: FormBuilder,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private EmailTemplateService: EmailTemplateService,
    private _shared: SharedService) {

    this.loginForm = fb.group({
      template_Name: ["", Validators.required],
      body: ["", Validators.required],

    });

  }

  ngOnInit(): void {



    this.userDetails = this._shared.getUserDetails();
    console.log("message", this.userDetails);


    this.Gettemplatedata = sessionStorage.getItem('manku');
    // this.Gettemplatedatad = sessionStorage.getItem('userDetails');
    this.htmlContent = this.Gettemplatedata; // Initialize htmlContent with existing data
    this.StoreTemplateData = sessionStorage.getItem('template');
    console.log(this.Gettemplatedata);
    console.log(this.StoreTemplateData)
    console.log("abcd", this.abcd)
    this.loginForm.patchValue({
      template_Name: this.StoreTemplateData

    })



  }





  ngAfterViewInit(): void {
    // Adjust the height based on the content's length after the view has been initialized
    this.adjustEditorHeight();
  }

  onHtmlContentChanged(content: string): void {
    console.log('Updated HTML content:', content);
    // Perform your desired action with the updated content here
    // For example, you can emit the updated content to an outer component
    this.htmlContentChanged.emit(content);
    this.adjustEditorHeight(); // Adjust the height when the content changes
  }

  private adjustEditorHeight(): void {
    if (this.editor) {
      const editorElement = this.editor.nativeElement;
      editorElement.style.height = 'auto'; // Reset the height to calculate the new height
      editorElement.style.height = `${editorElement.scrollHeight}px`; // Set the new height based on the content
    }
  }

  postdata() {

    let loginData = {
      "template_Name": this.loginForm.controls['template_Name'].value,
      "body": this.htmlContent,
      "company_Id": this.userDetails.Company_Id,
      "UserId": this.userDetails.UserId,
      "template_Id": "3"


    }
    this.ngxService.start();
    this.EmailTemplateService.updatetemplate(loginData).subscribe((res: any) => {
      this.ngxService.stop();
      this._shared.ToastPopup('Template updated successfully', '', 'success');

      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/email-template']));
      }, 2000);

    })
  }



}


