import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;
  images: any[] | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  ngOnInit() {
    this.items = [
      {
        label: 'Create Project',
        icon: 'pi pi-check',
        routerLink: '/projects',
      },
      {
        label: 'Upload Images',
        routerLink: '/projects',
      },
      {
        label: 'Annotate Images',
        routerLink: '/projects',
      },
      {
        label: 'Train your model',
        routerLink: '/projects',
      },
    ];
    this.images = [
      {
        itemImageSrc: 'assets/1.jpg',
        // thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: 'assets/2.jpg',
        // thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: 'assets/3.jpg',
        // thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: 'assets/4.jpg',
        // thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
    ];
  }
}
