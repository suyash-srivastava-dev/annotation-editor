import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { AngularPinturaModule } from '@pqina/angular-pintura';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MenubarModule } from 'primeng/menubar';
import { ProjectsComponent } from './projects/projects.component';
import { TableModule } from 'primeng/table';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ImageUploadComponent,
    ProjectsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularPinturaModule,
    ToastModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
    MenubarModule,
    TableModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    StepsModule,
    GalleriaModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
