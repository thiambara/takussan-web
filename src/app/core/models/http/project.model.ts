import {BaseModelInterface} from "./base/base.model";
import {User} from "./user.model";
import {Land} from "./land.model";

export interface Project extends BaseModelInterface {
  title?: string;
  description?: string;
  status?: string;
  user_id?: number;
  user?: User;
  lands?: Land[];
}

