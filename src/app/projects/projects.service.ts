import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { PinataSDK } from "pinata";
import { environment } from 'src/environments/environment.development';
import {pinata} from '../image-upload/image-upload.service'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  


  constructor(private http: HttpClient) { 
  }


  baseApiUrl = 'http://127.0.0.1:8000'
  headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');


  
  fetchProjects() {
    let path='/v2/project/projects'
    return this.http.get(this.baseApiUrl+path, { headers: this.headers })
  }
  fetchDatasetInProject(prjId:string) {
    let path='/v2/project/datasets/'
    return this.http.get(this.baseApiUrl+path+prjId, { headers: this.headers })
  }
  createNewProject(projectDetails:any) {
    let path='/v2/project/createproject'
    return this.http.post(this.baseApiUrl+path, projectDetails, { headers: this.headers })
  }

  async fetchImagesServices(id:string){
    // const getCid= await pinata.gateways.get(id)
    const url =await pinata.gateways.createSignedURL({
                  cid: id,
              expires: 1800,
              })
  console.log('url',url)
  // console.log('getCID',getCid)
  return url
  }

  downloadAnnotations(project_id: string) {
    let path='/v2/project/annotations/'
    return this.http.get(this.baseApiUrl+path+project_id, { headers: this.headers })
  }
  
  // submitFiles(body:any) {
  //   // throw new Error('Method not implemented.');
  //   return this.http.post(this.baseApiUrl+'submit',body=body,{ headers: this.headers })

  // }

}
