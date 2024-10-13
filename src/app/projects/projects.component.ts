import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }


  dataSource:any=[]
  dataSourceDataset:any=[]
  projectsView: boolean= true
  createProj: boolean= false
  projectId:string=''
  projectName:string=''
  tempUrl:string=''
  annotationDownload:any=''

  projectForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl('')
  });




  constructor(private projectService: ProjectsService, private router: Router) {}
  ngOnInit(): void {
    this.projectsView=true
    this.projectService.fetchProjects().subscribe( 
      (response: any) => {
        this.dataSource = response;
        console.log(response)
      }
      );
   

    // console.log(ELEMENT_DATA)
    // console.log(stichedFilesList)
    // throw new Error('Method not implemented.');
  }

  toggleNewProject(){
    this.createProj=true
  }
  uploadCommand(prjId:string) {
    // localStorage.clear()
    localStorage.setItem('project',prjId)
    this.router.navigate(['/uploads']);
  }

  createNewProject(){
    let projectDetails=this.projectForm.value
    this.projectService.createNewProject(projectDetails).subscribe( 
      (response: any) => {
        console.log(response)
        this.createProj=false
        this.ngOnInit()
      }
      );
    console.log('Create')

  }
  openProject(id:string,name:string){
    console.log(id)
    this.projectsView=false
    this.projectName=name
    this.projectId=id

    // this.annotationSet(this.projectId)
/**
 * 
 * {
        "dataset_img_url": "bafkreigs5wbrz37j3k4yngnuh45a2zb3u3zwazkqx4dnwahkv4g52bdwji",
        "id": "c77b5cc5-0766-462b-a273-fbbfe8cf04ea",
        "annotation_url": {},
        "annotation_img_url": "",
        "description": "blue_bg.jpg",
        "project_id": "ec177df6-ae9b-493c-9c3d-b74db45111c9"
    }
 * 
 */
    this.projectService.fetchDatasetInProject(id).subscribe( 
       async (response: any) => {
        await response.forEach(async (file: any) => {
            // formData.append("file", file, file.name);
            file.dataset_img_url=await this.fetchImages(file.dataset_img_url)
            file.annotation_img_url=await this.fetchImages(file.annotation_img_url)

           
          });
        console.log(response)
        this.dataSourceDataset = response;
        console.log(response)
          /**
           * Creating downloadable json
           */
        let ann:any=[]
        this.dataSourceDataset.forEach((datapoint:any)=>{
          let objectAnnotation ={
            "annotation":datapoint.annotation_url,
            "img":datapoint.dataset_img_url
          }
          console.log("objectAnnotation",objectAnnotation)

          ann.push(objectAnnotation)
        })
        // this.downloadAnnotation(ann)
        console.log("ann",ann)
        this.annotationDownload=ann
      }
      );
  }
  
  async fetchImages(id:string){
    
    return await this.projectService.fetchImagesServices(id)
  }

  annotateImage(url:string,id:string){
    console.log('migrate to annotation:',url)
    localStorage.setItem('imageUrl',url)
    localStorage.setItem('image_id',id)
    this.router.navigate(['/editor']);
  }

  annotationSet()
  {
    // let project_id=localStorage.getItem('project') || ''
    // let ann:any=[]
    // this.dataSourceDataset.forEach((datapoint:any)=>{
    //   let objectAnnotation ={
    //     "annotation":datapoint.annotation_url,
    //     "img":datapoint.dataset_img_url
    //   }
    //   console.log("objectAnnotation",objectAnnotation)

    //   ann.push(objectAnnotation)
    // })
    // // this.downloadAnnotation(ann)
    // console.log("ann",ann)
    this.downloadAnnotation(JSON.stringify(this.annotationDownload))

   
  }
   downloadAnnotation(project_id: string) {
    // let itemToReturn = new Observable();
    //  this.projectService.downloadAnnotations(project_id)

    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.annotationDownload));
    var downloader = document.createElement('a');

    downloader.setAttribute('href', data);
    downloader.setAttribute('download', 'file.json');
    downloader.click();

  }


  
    
    
}

