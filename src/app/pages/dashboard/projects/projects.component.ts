import {Component, OnInit} from '@angular/core';
import {ProjectListComponent} from "./project-list/project-list.component";

@Component({
  templateUrl: './projects.component.html',
  imports: [
    ProjectListComponent
  ],
  standalone: true
})
export class ProjectsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
