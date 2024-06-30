import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base/base-http.service";
import {Address} from "../../models/http/address.model";
import {Land} from "../../models/http/land.model";

@Injectable({
  providedIn: 'root'
})
export class LandService extends BaseHttpService<Land> {

  protected override suffix: string = 'lands';


}
