import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  addDocumentForm!: FormGroup;
  submitted:boolean = false;
  fileToUpload1: File | null = null;
  fileToUpload2: File | null = null;
  file1Valid:boolean = false;
  file2Valid:boolean = false;



  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.addDocumentForm = new FormGroup({
      file1: new FormControl('', [Validators.required]),
      file2: new FormControl('', [Validators.required]),
    });
  }
  onFileSelected(event: any) {
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

  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType !== 'pdf') {
      // Reset the value of the input and display an error message
      event.target.value = '';
      this.file2Valid = true;
      this.fileToUpload2 = null;
    } else {
      this.file2Valid = false;
      this.fileToUpload2 = file;
    }
  }

  submitDocumentForm() {
    this.submitted = true;
    if (!this.fileToUpload1 || !this.fileToUpload2) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file1', this.fileToUpload1);
    formDataToSend.append('file2', this.fileToUpload2);

    this.httpClient.post('https://winfill.azurewebsites.net/upload', formDataToSend).subscribe((data: any) => {
      // Handle success response
      this.submitted = false;
      if(data)
      {
  Swal.fire('Thank you...', 'Upload question succesfully!', 'success')  
      }
    }, (error) => {
      // Handle error response
      console.error('Error:', error);
  Swal.fire('Error', error.error.text, 'error')  
      this.submitted = false;
    });
  }

}
