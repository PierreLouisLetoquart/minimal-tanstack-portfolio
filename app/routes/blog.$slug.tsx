import { fetchPostBySlug } from "@/lib/content";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params: { slug } }) => {
    const html = await fetchPostBySlug(slug);
    return { html };
  },
  component: BlogPost,
});

function BlogPost() {
  const { html } = Route.useLoaderData();

  return (
    <>
      <div>
        <h1 className="font-semibold">Blog post</h1>
        <Link to="/">
          <h2 className="font-light text-muted-foreground">
            Pierre-Louis Létoquart
          </h2>
        </Link>
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
