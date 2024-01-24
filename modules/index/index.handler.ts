import { Context, HttpRequest } from "fastro/http/server/types.ts";
import { indexService } from "$app/modules/index/index.service.ts";

export function indexHandler(_req: HttpRequest, ctx: Context) {
  const indexData = indexService();
  return ctx.render(indexData);
}
