import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Project} from "../../../../core/models/http/project.model";
import {ProjectService} from "../../../../core/sevices/http/project.service";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TreeTableModule} from "primeng/treetable";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DialogService} from "primeng/dynamicdialog";
import {ProjectFormComponent} from "../project-form/project-form.component";
import {RouterLink} from "@angular/router";
import {Button} from "primeng/button";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  imports: [
    ToolbarModule,
    FileUploadModule,
    TreeTableModule,
    InputTextModule,
    TableModule,
    FormsModule,
    DatePipe,
    RouterLink,
    Button
  ],
  standalone: true
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  project: Project = {};
  selectedProjects: Project[] = [];

  searchQuery: string = '';
  searchQueryTimeout!: any;
  rowsPerPageOptions = [5, 10, 20];

  constructor(private projectService: ProjectService, private messageService: MessageService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    console.log(authUser)

    this.projectService.index({
      search_query: this.searchQuery,
      projects: {with_count: 'lands'},
      filter_fields: {user_id: authUser.id}
    }).subscribe({
      next: data => this.projects = (data as Project[]),
      error: error => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'An error has occurred',
        life: 3000
      })
    });
  }

  openNew() {
    this.showProjectForm();
  }

  onSearch() {
    if (this.searchQueryTimeout) {
      clearTimeout(this.searchQueryTimeout);
    }
    this.searchQueryTimeout = setTimeout(() => {
      this.getProjects();
    }, 500);
  }


  showProjectForm(project?: Project) {
    this.dialogService.open(ProjectFormComponent, {
      header: project?.id ? 'Update project' : 'Create new project',
      width: '40rem',
      closable: true,
      data: {
        project: project ?? {}
      }
    }).onClose.subscribe({
      next: (value) => {
        if (value) {
          this.getProjects();
        }
      }
    });
  }
}
