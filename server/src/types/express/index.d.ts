import type { JwtPayload } from "jsonwebtoken";

declare global {
  export type MyPayload = JwtPayload & { email: string };

  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      auth: MyPayload;
      /* ************************************************************************* */
    }
  }
}
