/**
 * Minimal frontmatter parser for the blog's fixed schema.
 *
 * Deliberately not gray-matter: that depends on Node's Buffer and breaks inside
 * a Vite browser bundle without a polyfill. Plain .mjs rather than .ts so the
 * browser bundle (src/components/blogData.ts) and the Node prerender script
 * (scripts/prerender-blog.mjs) share one implementation instead of drifting.
 *
 * Supports only what src/content/posts/*.md actually uses:
 *   key: value         -> string
 *   key: [a, b]        -> string[]
 *   key: true | false  -> boolean
 * Surrounding quotes are optional and stripped. Values may contain colons;
 * only the first colon on a line separates key from value.
 */

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function unquote(value) {
  const trimmed = value.trim();
  const quoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"));
  return quoted ? trimmed.slice(1, -1) : trimmed;
}

function parseValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map(unquote)
      .filter(Boolean);
  }
  return unquote(value);
}

export function parseFrontmatter(raw, source = 'post') {
  const match = FENCE.exec(raw);
  if (!match) {
    throw new Error(`${source}: missing frontmatter block (expected a leading '---' fence)`);
  }

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    const sep = line.indexOf(':');
    if (sep === -1) {
      throw new Error(`${source}: malformed frontmatter line: ${line}`);
    }

    data[line.slice(0, sep).trim()] = parseValue(line.slice(sep + 1).trim());
  }

  return { data, body: raw.slice(match[0].length) };
}
