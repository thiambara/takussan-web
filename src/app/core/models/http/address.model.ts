import {BaseModelInterface} from "./base/base.model";

export interface Address extends BaseModelInterface {
  address?: string;
  country?: string;
  city?: string;
  district?: string;
  building?: string;
  latitude?: string;
  longitude?: string;
  street?: string;
  addressable_id?: number;
  addressable_type?: string;
  addressable?: BaseModelInterface;
}

