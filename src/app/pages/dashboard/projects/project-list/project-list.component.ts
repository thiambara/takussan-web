import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Property} from "../../../../core/models/http/project.model";
import {ProjectService} from "../../../../core/sevices/http/project.service";
import {Toolbar} from "primeng/toolbar";
import {Table, TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";
import {DialogService} from "primeng/dynamicdialog";
import {RouterLink} from "@angular/router";
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {ProjectComponentService} from "../component-services/project.component.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  imports: [
    TableModule,
    DatePipe,
    RouterLink,
    Button,
    IconField,
    InputIcon,
    Toolbar,
    FormsModule,
    InputText
  ],
  standalone: true
})
export class ProjectListComponent implements OnInit {
  @ViewChild('projectsTable') projectsTable!: Table;

  projects: Property[] = [];
  project: Property = {};
  selectedProjects: Property[] = [];

  searchQuery: string = '';
  searchQueryTimeout!: any;
  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private projectComponentService: ProjectComponentService,
    private projectService: ProjectService,
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
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
      next: data => this.projects = (data as Property[]),
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


  showProjectForm(project?: Property) {
    this.projectComponentService.showProjectForm(project).onClose.subscribe({
      next: (value) => {
        if (value) {
          this.getProjects();
        }
      }
    });
  }

  exportCSV() {
    this.projectsTable.exportCSV();
  }
}
