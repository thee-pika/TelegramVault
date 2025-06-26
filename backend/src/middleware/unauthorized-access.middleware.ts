import type { Context, Next } from "hono";
import { ValidationError } from "./error.middleware.js";

const sessionValidator = (c: Context, next: Next) => {
  const user = c.get("user");
  const path = c.req.path;

  if (path.startsWith("/api/v1/dashboard") && !user) {
    throw new ValidationError(
      {
        action: "access_protected_resource",
        requiredPermission: "user",
        receivedPermission: "unauthorized",
      },
      "Unauthorized access attempt detected.",
      401
    );
  }

  return next();
};

export default sessionValidator;
