import { Fastro } from "fastro/core/server/types.ts";
import { indexLayout } from "@app/modules/index/index.layout.tsx";
import { indexHandler } from "@app/modules/index/index.handler.ts";
import indexPage from "@app/modules/index/index.page.tsx";

export function indexModule(f: Fastro) {
  f.page("/", {
    component: indexPage,
    layout: indexLayout,
    handler: indexHandler,
    folder: "modules/index",
  });
  return f;
}
