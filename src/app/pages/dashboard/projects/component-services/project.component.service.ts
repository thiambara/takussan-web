import {Injectable} from '@angular/core';
import {Project} from "../../../../core/models/http/project.model";
import {ProjectFormComponent} from "../project-form/project-form.component";
import {DialogService} from "primeng/dynamicdialog";

@Injectable({
  providedIn: 'root'
})
export class ProjectComponentService {

  constructor(private dialogService: DialogService) {
  }


  showProjectForm(project?: Project) {
    return this.dialogService.open(ProjectFormComponent, {
      header: project?.id ? 'Update project' : 'Create new project',
      width: '40rem',
      closable: true,
      data: {
        project: project ?? {}
      }
    })
  }
}
