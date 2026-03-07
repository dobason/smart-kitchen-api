import { t } from "elysia";

export const userSchema = {
  update: t.Object({
    username: t.Optional(t.String({ minLength: 2, maxLength: 255 })),
    avatarUrl: t.Optional(t.String()),
  }),
};
