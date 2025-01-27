import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ProjectService} from "../../../../core/sevices/http/project.service";
import {Project} from "../../../../core/models/http/project.model";
import {CommonModule} from "@angular/common";
import {finalize} from "rxjs";
import {Button} from "primeng/button";
import {LandItemComponent} from "./land-item/land-item.component";
import {ProjectComponentService} from "../component-services/project.component.service";
import {LandComponentService} from "../component-services/land.component.service";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  imports: [
    CommonModule,
    Button,
    LandItemComponent,
  ],
  standalone: true
})
export class ProjectDetailsComponent implements OnInit {
  project?: Project;
  projectId!: number;
  loading = false;

  constructor(
    private projectComponentService: ProjectComponentService,
    private landComponentService: LandComponentService,
    private projectService: ProjectService,
    private messageService: MessageService,
  ) {
  }

  @Input()
  set id(id: string) {
    this.projectId = +id;
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.loading = true;
    this.projectService.get(this.projectId, {
      projects: {with: ['lands', 'lands.bookings'], with_count: 'lands'},
      filter_fields: {'lands.bookings.status': '@in pending,approved'}
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: result => {
          this.project = result;
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'An error has occurred',
            life: 3000
          })
        }
      });
  }

  editProject() {
    if (!this.project) return;
    this.projectComponentService.showProjectForm(this.project).onClose.subscribe({
      next: (value) => {
        if (value) {
          this.getProject();
        }
      }
    });
  }

  addNewLandToProject() {
    if (!this.project) return;
    this.landComponentService.showLandForm(undefined, this.projectId).onClose.subscribe({
      next: (value) => {
        if (value) {
          this.getProject();
        }
      }
    });
  }
}
