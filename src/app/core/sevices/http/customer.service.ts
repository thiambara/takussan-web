import {Injectable} from '@angular/core';
import {BaseHttpService} from "./base/base-http.service";
import {User} from "../../models/http/user.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseHttpService<User> {

  protected override suffix: string = 'customers';


}
