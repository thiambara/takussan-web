import {Injectable} from '@angular/core';
import {Land} from "../../../../core/models/http/land.model";
import {LandFormComponent} from "../project-details/land-form/land-form.component";
import {DialogService} from "primeng/dynamicdialog";

@Injectable({
  providedIn: 'root'
})
export class LandComponentService {

  constructor(private dialogService: DialogService) {
  }

  showLandForm(land?: Land, projectId?: number) {
    return this.dialogService.open(LandFormComponent, {
      header: land?.id ? 'Update land' : 'Add new land',
      width: '40rem',
      closable: true,
      data: {
        land: land ?? {},
        projectId: projectId ?? land?.id,
      }
    });
  }

}
