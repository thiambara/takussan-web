import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Project} from "../../../core/models/http/project.model";
import {ProjectService} from "../../../core/sevices/http/project.service";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {Ripple} from "primeng/ripple";
import {TreeTableModule} from "primeng/treetable";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  templateUrl: './projects.component.html',
  imports: [
    ToolbarModule,
    FileUploadModule,
    Ripple,
    TreeTableModule,
    InputTextModule,
    TableModule,
    FormsModule,
    DatePipe
  ],
  standalone: true
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  project: Project = {};
  selectedProjects: Project[] = [];
  expandedRows = {};

  searchQuery: string = '';
  searchQueryTimeout!: any;
  rowsPerPageOptions = [5, 10, 20];

  constructor(private projectService: ProjectService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {


    this.projectService.index({search_query: this.searchQuery}).subscribe({
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
    this.project = {};
  }

  onSearch() {
    if (this.searchQueryTimeout) {
      clearTimeout(this.searchQueryTimeout);
    }
    this.searchQueryTimeout = setTimeout(() => {
      this.getProjects();
    }, 500);
  }
}
