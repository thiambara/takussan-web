import {BaseModelInterface} from "./base/base.model";
import {Land} from "./land.model";
import {User} from "./user.model";


export interface Booking extends BaseModelInterface {
  land_id?: number;
  user_id?: number;
  status?: 'pending' | 'approved' | 'rejected' | 'cancelled';
  land?: Land;
  user?: User;
}

