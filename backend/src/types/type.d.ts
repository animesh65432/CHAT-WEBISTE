import { UserTypes } from "./index"

declare global {
  namespace Express {
    interface Request {
      user: UserTypes;
    }
  }
}