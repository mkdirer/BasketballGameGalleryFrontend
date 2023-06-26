import { AccessRight } from './access-right.model';
export class User {
  id?: any;
  username?: string;
  email?: string;
  accessRights?: AccessRight[];
}
