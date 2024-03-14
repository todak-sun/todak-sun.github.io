import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { createMDX, readLogsMarkdownFile, readLogsPaths } from "../../utils";

export async function generateStaticParams() {
  const paths = await readLogsPaths();
  return paths.map((slug) => ({ slug }));
}

const LogsPage = async ({ params }: { params: { slug: string } }) => {
  const markdown = await readLogsMarkdownFile(params.slug);
  if (!markdown) {
    notFound();
  }

  const { content, frontmatter } = await createMDX<{ title: string; date: Date }>(params.slug);

  return (
    <>
      <div>{frontmatter.title || "untitle"}</div>
      <div>{frontmatter.date.toISOString() || ""}</div>
      <div>{content}</div>
    </>
  );
};

export default LogsPage;
