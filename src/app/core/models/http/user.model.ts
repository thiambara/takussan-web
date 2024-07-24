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
  status?: string;
  username?: string;
  password?: string;
  google_id?: string;
  type?: string;
  addresses?: Address[];
  projects?: Project[];
  bookings?: Booking[];
}


