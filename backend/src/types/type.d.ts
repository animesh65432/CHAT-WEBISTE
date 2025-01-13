import { UserTypes } from "../models/user";

declare global {
  namespace Express {
    interface User {
      id: string; // Add other properties of the `user` object here if needed
      name?: string;
    }

    interface Request {
      user?: User; // Extend the Request object with the user property
    }
  }
}