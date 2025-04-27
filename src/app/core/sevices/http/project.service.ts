import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base/base-http.service";
import {Property} from "../../models/http/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseHttpService<Property> {

  protected override suffix: string = 'projects';


}
