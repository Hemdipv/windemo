import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

indexData:any = {};

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.post('https://winfill.azurewebsites.net/index','').subscribe((data: any) => {
    // this.indexData = data;
  }); 
  }



}

