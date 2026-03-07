import { t } from "elysia";

export const paginationSchema = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 10 })),
});

export const idParamSchema = t.Object({
  id: t.Numeric(),
});

export const searchSchema = t.Object({
  q: t.Optional(t.String()),
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100, default: 10 })),
});
