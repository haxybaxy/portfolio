export type FrontmatterValue = string | string[] | boolean;

export interface ParsedFrontmatter {
  data: Record<string, FrontmatterValue | undefined>;
  body: string;
}

/**
 * @param raw Full file contents, frontmatter fence included.
 * @param source Label used in error messages (the post slug).
 */
export declare function parseFrontmatter(raw: string, source?: string): ParsedFrontmatter;
