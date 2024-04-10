import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload-question',
  templateUrl: './upload-question.component.html',
  styleUrls: ['./upload-question.component.css']
})
export class UploadQuestionComponent implements OnInit {
  addDocumentForm!: FormGroup;
  submitted:boolean = false;
  file1Valid:boolean = false;
  fileToUpload1: File | null = null;


  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.addDocumentForm = new FormGroup({
      file1: new FormControl('', [Validators.required]),
    });
  }
  onFileSelected(event: any) {
    // this.fileToUpload1 = event.target.files[0];
    const file: File = event.target.files[0];
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType !== 'pdf') {
      // Reset the value of the input and display an error message
      event.target.value = '';
      this.file1Valid = true;
      this.fileToUpload1 = null;
    } else {
      this.file1Valid = false;
      this.fileToUpload1 = file;
    }
 }


  submitDocumentForm()
  {

    this.submitted = true;
    if (!this.fileToUpload1) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file1', this.fileToUpload1);

    if(this.addDocumentForm.valid)
    {
      this.httpClient.post('https://winfill.azurewebsites.net/upload_questions',formDataToSend).subscribe((data: any) => {
        // console.log(data)
        this.submitted = false;
        if(data)
        {
    Swal.fire('Thank you...', 'Upload question succesfully!', 'success')  
        }


        
        // Swal.fire('Thank you...', 'We will Contact you soon', 'success');
        // this.router.navigate(['/interview']);
      }, (error) => {
        // Handle error response
        console.error('Error:', error);
    Swal.fire('Error', error.error.text, 'error')  
        this.submitted = false;
      }); 
    }
  }

}
