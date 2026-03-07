import { t } from "elysia";

export const tagSchema = {
  create: t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
    category: t.Optional(t.String()),
  }),
  update: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    category: t.Optional(t.String()),
  }),
};
