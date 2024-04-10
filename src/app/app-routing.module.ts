import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UploadQuestionComponent } from './upload-question/upload-question.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path:'', component:UploadDocumentComponent
  },
  {
    path:'upload-question', component:UploadQuestionComponent
  },
  {
    path:'index', component:IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
