import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PinataSDK } from "pinata";
import { environment } from 'src/environments/environment.development';

const pinata = new PinataSDK({
  pinataJwt: environment.JWT,
  pinataGateway: 'emerald-charming-nightingale-701.mypinata.cloud',
});

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  

  constructor(private http: HttpClient) { 
  }


  baseApiUrl = 'http://127.0.0.1:8000'
  headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
  // compareList=[]
  
  // public uploadfile(file: File) {
  //   let formParams = new FormData();
  //   formParams.append('file', file)
  //   return this.http.post('http://localhost:3000/uploadFile', formParams)
  // }

  async uploadfile(blobFile: string) {
        // const filename = new File(["hello world!"], "hello.txt", { type: "text/plain" })
        
        // const blob = new Blob([blobFile]);
        // const file = new File([blob], "image.png", { type: ""})
        // const upload = await pinata.upload.file(file);

        const upload = await pinata.upload.url(blobFile)
        // const upload_json = await pinata.upload.json(annotationJson)
        // let upload = await pinata.upload.file(file)
       
        return upload
  }

  updateAnnotations(body:string){
    let make_body=JSON.parse(body)
    console.log('make req',make_body)
    
    return this.http.patch('http://127.0.0.1:8000/v2/project/updateannotation',make_body,{headers:this.headers})

  }

  

  async fetchFiles(cid:string){

  // const file = await pinata.gateways.get(cid)
  // return file
  try {
    // const data = await pinata.gateways.get(cid);
    // console.log(data)

    const url = await pinata.gateways.createSignedURL({
       	cid: cid,
    	expires: 1800,
    })
    console.log(url)

  } catch (error) {
    console.log(error);
  }
  }
  
  submitFiles(body:any) {
    // throw new Error('Method not implemented.');
    return this.http.post(this.baseApiUrl+'submit',body=body,{ headers: this.headers })

  }

}
