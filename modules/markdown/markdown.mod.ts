import { Fastro } from "fastro/core/server/types.ts";
import markdown from "fastro/middleware/markdown/mod.tsx";
import readmeLayout from "@app/modules/markdown/readme.layout.tsx";

export function markdownModule(f: Fastro) {
  /**
   * read markdown file on this "." folder with empty "" prefix
   */
  f.use(markdown(readmeLayout, ".", ""));
  return f;
}
