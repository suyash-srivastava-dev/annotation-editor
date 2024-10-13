import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  LocaleCore,
  LocaleCrop,
  LocaleFinetune,
  LocaleFilter,
  LocaleAnnotate,
  LocaleMarkupEditor,
} from '@pqina/pintura/locale/en_GB';

import {
  PinturaEditorOptions,
  getEditorDefaults,

  // editor
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_finetune,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_defaults,
  plugin_annotate,
  markup_editor_defaults,

  // filepond
  legacyDataToImageState,
  openEditor,
  processImage,
} from '@pqina/pintura';
import { PinturaEditorComponent } from '@pqina/angular-pintura';
import { ImageService } from './image.service';
import { Router } from '@angular/router';


setPlugins(plugin_crop, plugin_annotate);

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent  {

  file: File | any = null;
  
  @ViewChild('editorRef') editorRef?: PinturaEditorComponent<any> = undefined;

  constructor(private sanitizer: DomSanitizer, private imageService: ImageService, private router:Router) {}
  // constructor(private stichDcm: StichedDcmService,private router: Router) { }

  editorOptions = {
    utils: ['crop', 'finetune', 'filter', 'annotate'],
    imageReader: createDefaultImageReader(),
    imageWriter: createDefaultImageWriter({
      targetSize: {
        width: 512,
        height: 512,
        fit: 'contain',
      },
    }),
    shapePreprocessor: createDefaultShapePreprocessor(),
    ...plugin_finetune_defaults,
    ...plugin_filter_defaults,
    ...markup_editor_defaults,
    locale: {
      ...LocaleCore,
      ...LocaleCrop,
      ...LocaleFinetune,
      ...LocaleFilter,
      ...LocaleAnnotate,
      ...LocaleMarkupEditor,
    },
  } as PinturaEditorOptions;

  src: string = localStorage.getItem('imageUrl') || '';
  result?: string = undefined;
  cropAspectRatio = 1;

  handleLoad($event: any) {
    console.log('load', $event);

    console.log('component ref', this.editorRef);

    console.log('editor instance ref', this.editorRef?.editor);

    console.log(
      'inline editor image state',
      this.editorRef?.editor?.imageState
    );
  }

  async handleProcess($event: any) {
    console.log('process', $event);

    const objectURL = URL.createObjectURL($event.dest);
    console.log(objectURL)
    const annotationPoints=$event.imageState.annotation
    await this.imageService.uploadfile(objectURL).then( (resp)=>{
      console.log('resp upload done',resp)
      let body={
        "id": localStorage.getItem('image_id'),
        "annotation_url": JSON.stringify(annotationPoints),
        "annotation_img_url": resp.cid
      }
      console.log('resp upload done',body)

     this.imageService.updateAnnotations(JSON.stringify(body)).subscribe(
      (resp)=>{
        this.router.navigate(['/projects']);
      }
     )
  
    })
    // this.result = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   objectURL
    // ) as string;
    //   console.log(this.result)
      console.log('annota',annotationPoints)

  }

}
