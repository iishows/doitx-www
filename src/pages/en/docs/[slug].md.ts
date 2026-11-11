import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { markdownResponse } from "../../../agent-content";
import { DOCS_SLUGS, docsSlugFromEntryId } from "../../../docs";

export const getStaticPaths = (async () =>
  (await getCollection("docs"))
    .filter((entry) => entry.id.startsWith("en/"))
    .map((entry) => ({ entry, slug: docsSlugFromEntryId(entry.id) }))
    .filter(({ slug }) => slug !== DOCS_SLUGS[0])
    .map(({ entry, slug }) => ({
      params: { slug },
      props: { body: entry.body ?? "" },
    }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ body: string }> = ({ props, request }) =>
  markdownResponse(props.body, request.method);
