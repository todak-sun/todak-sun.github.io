import * as fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import * as path from "path";
import matter from "gray-matter";

const POSTS_FOLDER = path.join(process.cwd(), "content", "logs");

export const readLogsMarkdownFile = async (slug: string) => {
  const filePath = path.resolve(path.join(POSTS_FOLDER, `${slug}.mdx`));
  try {
    await fs.access(filePath);
  } catch (err) {
    return null;
  }

  const fileContent = await fs.readFile(filePath, { encoding: "utf-8" });
  return fileContent;
};

export const createMDX = async <T>(path: string) => {
  const source = await readLogsMarkdownFile(path);
  if (!source) {
    throw new Error("Not Found");
  }
  return await compileMDX<T>({
    source,
    options: { parseFrontmatter: true },
  });
};

export const createMatters = async <T>(): Promise<(T & { summary: string; path: string })[]> => {
  const paths = await readLogsPaths();
  return await Promise.all(
    paths.map(async (path) => {
      const source = await readLogsMarkdownFile(path);
      const { content, data } = matter(source!);
      const mat = data as T;
      return {
        ...mat,
        summary: content.slice(0, Math.min(content.length - 1, 1000)),
        path,
      };
    }),
  );
};

export const readLogsPaths = async () => {
  const regex = /\.mdx?$/;
  return await fs.readdir(POSTS_FOLDER).then((paths) => paths.filter((path) => regex.test(path)).map((path) => path.replace(regex, "")));
};
