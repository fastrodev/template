import { User } from "@app/modules/user/user.types.ts";
import { kv } from "@app/utils/db.ts";
import { ulid } from "jsr:@std/ulid";

export async function getUserByUserIdService(userId: string) {
  const res = await kv.get<User>(["users", userId]);
  return res.value;
}

/**
 * getAllUserService
 *
 * list options:
   ```
   {
      limit?: number;
      reverse?: boolean;
      cursor?: string;
      consistency?: Deno.KvConsistencyLevel;
      batchSize?: number;
   }
   ```
 * see: https://deno.land/api@v1.39.4?s=Deno.KvListOptions&unstable=
 * @returns
 */
export async function getAllUserService(
  options?: Deno.KvListOptions,
): Promise<[User[], string]> {
  const list = kv.list<User>(
    { prefix: ["users"] },
    options,
  );

  const users = [];
  for await (const entry of list) {
    users.push(entry.value);
  }
  return [users, list.cursor];
}

function createUserKey(user: User) {
  if (!user.id) {
    throw new Error(
      "Failed to createUserKey. user.id is undefined",
    );
  }
  const usersKey = ["users", user.id];
  const usersByEmailKey = ["users_by_email", user.email];
  const usersByUsernameKey = ["users_by_username", user.userName];
  const userByMobileKey = [
    "users_by_mobile_phone",
    user.mobile,
  ];
  const usersByFirstnameKey = [
    "users_by_firstname",
    user.firstName,
    user.id,
  ];

  return [
    usersKey,
    usersByEmailKey,
    usersByUsernameKey,
    userByMobileKey,
    usersByFirstnameKey,
  ];
}

export async function createUserService(user: User) {
  if (!user.id) user.id = ulid();
  const [
    usersKey,
    usersByEmailKey,
    usersByUsernameKey,
    userByMobileKey,
    usersByFirstnameKey,
  ] = createUserKey(user);

  const res = await kv.atomic()
    .check({ key: usersKey, versionstamp: null })
    .check({ key: usersByEmailKey, versionstamp: null })
    .check({ key: usersByUsernameKey, versionstamp: null })
    .check({ key: userByMobileKey, versionstamp: null })
    .set(usersKey, user)
    .set(usersByEmailKey, user)
    .set(userByMobileKey, user)
    .set(usersByUsernameKey, user)
    .set(usersByFirstnameKey, user)
    .commit();

  if (!res.ok) throw new Error("Failed to create user");
}

export async function updateUserService(user: User) {
  const [
    usersKey,
    usersByEmailKey,
    usersByUsernameKey,
    userByMobileKey,
    usersByFirstnameKey,
  ] = createUserKey(user);

  const res = await kv.atomic()
    .check({ key: usersKey, versionstamp: null })
    .check({ key: usersByEmailKey, versionstamp: null })
    .check({ key: usersByUsernameKey, versionstamp: null })
    .check({ key: userByMobileKey, versionstamp: null })
    .set(usersKey, user)
    .set(usersByEmailKey, user)
    .set(userByMobileKey, user)
    .set(usersByUsernameKey, user)
    .set(usersByFirstnameKey, user)
    .commit();

  if (!res.ok) throw new Error("Failed to update user");
}

export async function deleteUserService(userId: string) {
  await kv.delete(["users", userId]);
}
