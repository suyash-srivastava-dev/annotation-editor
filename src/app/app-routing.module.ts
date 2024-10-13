import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './image/image.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'projects', component: ProjectsComponent
  },
  {
    path: 'uploads', component: ImageUploadComponent
  },
  {
    path: 'editor', component: ImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
