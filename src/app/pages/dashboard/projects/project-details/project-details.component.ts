import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ProjectService} from "../../../../core/sevices/http/project.service";
import {Project} from "../../../../core/models/http/project.model";
import {CommonModule} from "@angular/common";
import {finalize} from "rxjs";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

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
  project!: Project;
  projectId!: number;
  loading = false;

  constructor(
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

  }
}
