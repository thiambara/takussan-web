import {Project} from "./project.model";
import {BaseModelInterface} from "./base/base.model";
import {Address} from "./address.model";
import {Booking} from "./booking.model";

export interface User extends BaseModelInterface {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  email_verified_at?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'blocked' | 'delete';
  username?: string;
  password?: string;
  added_by_id?: number;
  google_id?: string;
  roles?: ('admin' | 'customer' | 'vendor')[];
  addresses?: Address[];
  projects?: Project[];
  bookings?: Booking[];
  added_by?: User;
}


