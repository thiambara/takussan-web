import {BaseModelInterface} from "./base/base.model";
import {User} from "./user.model";
import {Land} from "./land.model";

export interface Property extends BaseModelInterface {
  title?: string;
  description?: string;
  status?: 'active' | 'inactive' | 'closed';
  user_id?: number;
  user?: User;
  lands?: Land[];
  lands_count?: number;
}

