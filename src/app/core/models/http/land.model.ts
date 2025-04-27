import {BaseModelInterface} from "./base/base.model";
import {Property} from "./project.model";
import {Booking} from "./booking.model";

export interface Land extends BaseModelInterface {
  title?: string;
  description?: string;
  status?: 'active' | 'inactive' | 'sold';
  price?: number;
  area?: number;
  project_id?: number;
  project?: Property;
  bookings?: Booking[];
}

