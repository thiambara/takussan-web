import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base/base-http.service";
import {Address} from "../../models/http/address.model";
import {Project} from "../../models/http/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseHttpService<Project> {

  protected override suffix: string = 'projects';


}
