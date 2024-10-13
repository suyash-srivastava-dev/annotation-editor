import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'annotation-editor';
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}
  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/']);
          }
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
              {
                label: 'New Project',
                icon: 'pi pi-bolt'
              },
                {
                    label: 'All',
                    icon: 'pi pi-bolt',
                    command: () => {
                      this.router.navigate(['/projects']);
                  }
                },
                {
                    label: 'Bookmarked',
                    icon: 'pi pi-server'
                }
            ]
        },
        {
          label: 'Annotate',
          icon: 'pi pi-palette',
          command: () => {
            this.router.navigate(['/editor']);
            }
        }
          // items: [
          //     {
          //         label: 'Apollo',
          //         icon: 'pi pi-palette'
          //     },
          //     {
          //         label: 'Ultima',
          //         icon: 'pi pi-palette'
          //     }
          // ]
      
    ]
  }
  navigate(loc:string){
    
  }
}
