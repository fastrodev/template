import { Fastro } from "fastro/core/server/types.ts";
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsers,
  getUserByUserIdHandler,
  updateUserHandler,
} from "@app/modules/user/user.handler.ts";

export function userModule(s: Fastro) {
  s.get("/api/user", getAllUsers);
  s.get("/api/user/:userId", getUserByUserIdHandler);
  s.post("/api/user", createUserHandler);
  s.put("/api/user", updateUserHandler);
  s.delete("/api/user", deleteUserHandler);
  return s;
}
