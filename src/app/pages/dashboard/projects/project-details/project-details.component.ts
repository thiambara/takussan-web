import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ProjectService} from "../../../../core/sevices/http/project.service";
import {Project} from "../../../../core/models/http/project.model";
import {CommonModule} from "@angular/common";
import {finalize} from "rxjs";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {ProjectFormComponent} from "../project-form/project-form.component";
import {DialogService} from "primeng/dynamicdialog";
import {LandFormComponent} from "./land-form/land-form.component";
import {Land} from "../../../../core/models/http/land.model";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  imports: [
    CommonModule,
    ButtonDirective,
    Ripple,
  ],
  standalone: true
})
export class ProjectDetailsComponent implements OnInit {
  project?: Project;
  projectId!: number;
  loading = false;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private dialogService: DialogService
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
    this.projectService.get(this.projectId, {projects: {with: "lands", with_count: "lands"}})
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
    this.dialogService.open(ProjectFormComponent, {
      header: 'Update project',
      width: '40rem',
      closable: true,
      data: {
        project: this.project
      }
    }).onClose.subscribe({
      next: (value) => {
        if (value) {
          this.getProject();
        }
      }
    });
  }

  showLandForm(land?: Land) {
    if (!this.project) return;
    this.dialogService.open(LandFormComponent, {
      header: land?.id ? 'Update land' : 'Add new land',
      width: '40rem',
      closable: true,
      data: {
        land: land ?? {},
        projectId: this.projectId
      }
    }).onClose.subscribe({
      next: (value) => {
        if (value) {
          this.getProject();
        }
      }
    });
  }
}
