import {Component, OnInit} from '@angular/core';
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectComponentService} from "./component-services/project.component.service";
import {BookingComponentService} from "./component-services/booking.component.service";
import {LandComponentService} from "./component-services/land.component.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  imports: [
    ProjectListComponent
  ],
  providers: [
    BookingComponentService,
    LandComponentService,
    ProjectComponentService,
  ],
  standalone: true
})
export class ProjectsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
