import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PinataSDK } from "pinata";
import { environment } from 'src/environments/environment.development';

export const pinata = new PinataSDK({
  pinataJwt: environment.JWT,
  pinataGateway: 'emerald-charming-nightingale-701.mypinata.cloud',
});

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { 
  }


  baseApiUrl = 'http://127.0.0.1:8000'
  headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');

  async uploadfile(file: File) {
        // let formParams = new FormData();
        // formParams.append('file', file)
        // const filename = new File(["hello world!"], "hello.txt", { type: "text/plain" })
        const upload = await pinata.upload.file(file)
        return upload
  }

  async uploadMultipleFiles(files: File[]) {
    // let formParams = new FormData();
    // formParams.append('file', file)
    // const filename = new File(["hello world!"], "hello.txt", { type: "text/plain" })
    let upload:any=[]
    files.forEach(
      async (file) => {
        //   // formData.append("file", file, file.name);
        upload.append(await pinata.upload.file(file))
        }
    )
    // const upload = 
    return upload
}
  async uploadDatabase(file: File)
  {
    let path='/v2/project/createdataset'
    let r:any
    let project_id=localStorage.getItem('project')
    if(project_id==null)
    {
      project_id=""
    }
    console.log('prj',project_id)
    let body=  {
      "dataset_img_url": "",
      "annotation_url": "{}",
      "annotation_img_url": "",
      "description": "",
      "project_id": project_id
    }
    
    await this.uploadfile(file).then(async (res)=>{
      /**
       * 
       * 
        {
          "id": "019280e3-6a51-7235-bc2b-178db53a6bbe",
          "name": "swastik.jpg",
          "cid": "bafkreiczxtuobcp2md5w4rtrrrcvqmk5qfpwexrejkenufpzhdm2dep5gi",
          "created_at": "2024-10-12T13:20:42.320Z",
          "size": 6849,
          "number_of_files": 1,
          "mime_type": "image/jpeg",
          "user_id": "239da160-ea2f-4d07-8ea6-93b0d817cf8a",
          "is_duplicate": true
        }
        *
       */
        body.dataset_img_url=res.cid
        body.description=res.name
        console.log('Pinata Res:',body)
        this.http.post(this.baseApiUrl + path, body, { headers: this.headers }).subscribe((data) => {

        console.log('database', data);
      })

    })
    
    

   return r

  }
  
  async uploadfiles(files: File[]){

    // let formParams = new FormData();
    let outputResponse:any =[]
   
    // for (let i = 0; i < files.length; i++) {
    //   // console.log ("Block statement execution no." + i);
    //   const upload = await pinata.upload.file(files[i])
    //   await outputResponse.concat(upload)

    // }
    // console.log(outputResponse)
    let r:any
    let project_id=localStorage.getItem('project')
    if(project_id==null)
    {
      project_id=""
    }
    console.log('prj',project_id)
    r=this.createDatasetForProject(project_id)
    console.log(r)
    return r
}

  createDatasetForProject(project_id:string){
    /**
     * Data request format
    {
      "description": "string",
      "annotation_url": "string",
      "project_id": "string",
      "dataset_img_url": "string",
      "annotation_img_url": "string"
    }
    */
  let body=  {
    "dataset_img_url": "string",
    "id": "1c4bf9ae-3ea4-4bfe-8f5f-c4f7104ec0a6",
    "annotation_url": {},
    "annotation_img_url": "string",
    "description": "string",
    "project_id": "5dec9acb-a6c3-4f50-a1a4-2bf66bb9b8b6"
  }

    let path='/v2/project/createdataset'
    console.log('creating request',path)
    let response=this.http.post(this.baseApiUrl + path, body, { headers: this.headers })

    return response
  }
  async fetchFiles(cid:string){

  try {
    const url = await pinata.gateways.createSignedURL({
       	cid: cid,
    	expires: 1800,
    })
    console.log(url)

  } catch (error) {
    console.log(error);
  }
  }

}
