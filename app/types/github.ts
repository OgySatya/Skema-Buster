import type { User } from "./user";

export interface Response {
  data: User[];
  sha: string;
}
