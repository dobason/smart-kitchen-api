import { t } from "elysia";

export const ingredientSchema = {
  create: t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
    icon: t.Optional(t.String()),
  }),
  update: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    icon: t.Optional(t.String()),
  }),
};
