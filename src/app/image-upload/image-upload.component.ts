import { Component} from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ImageUploadService } from './image-upload.service';
import { throwError } from 'rxjs';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  providers: [MessageService]
})
export class ImageUploadComponent {
  // uploadedFiles: any[] = [];
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file
  // files: File[] = [];
    // constructor(private messageService: MessageService, private imageUploadService: ImageUploadService) {}
    constructor(private imageUploadService: ImageUploadService) {}

    // onUpload(event:any) {
    //   console.log(event)
    //     for(let file of event.files) {
    //         // this.imageUploadService.uploadfile(file)
    //         console.log(file)
    //     }

    //     this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    // }
    // On file Select

  /** Multiple files upload*/  
  // onChange(event: any) {
  //   const files = event.target.files;

  //   if (files.length) {
  //     this.status = "initial";
  //     this.file = files;
  //   }
  // }

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  async onUpload() {
    // we will implement this method later
    console.log('Upload function started')
    this.status = "uploading";

    // [...this.files].forEach((file) => {
    //   // formData.append("file", file, file.name);
     
    // });
    if (this.file) {
    await this.imageUploadService.uploadDatabase(this.file)
    this.status = "success";
    }
    // if (this.files.length) {
    // // this.imageUploadService.uploadfiles(this.files)
    // // const formData = new FormData();
   

    //   // const upload$ = this.http.post("https://httpbin.com/post", formData);


    //   // await this.imageUploadService.uploadfiles(this.files).subscribe(res=>{
    //   // console.log(res)
    //   // })
    //   // this.imageUploadService.uploadfiles(this.files).then((res)=>{console.log(res)})
      

      
    // }
  }
}
