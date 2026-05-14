/**
 * Custom resolver hook so Node can import the project's ESM files
 * which omit the .js extension (Vite-style imports).
 */
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve as pathResolve } from 'node:path';

export async function resolve(specifier, context, nextResolve) {
  // Bare specifier or absolute URL: defer
  if (
    !specifier.startsWith('.') &&
    !specifier.startsWith('/') &&
    !specifier.startsWith('file:')
  ) {
    return nextResolve(specifier, context);
  }

  let parentPath;
  if (context.parentURL) {
    parentPath = dirname(fileURLToPath(context.parentURL));
  } else {
    parentPath = process.cwd();
  }

  const candidates = [
    specifier,
    `${specifier}.js`,
    `${specifier}.mjs`,
    `${specifier}/index.js`,
  ];

  for (const candidate of candidates) {
    const abs = candidate.startsWith('file:')
      ? fileURLToPath(candidate)
      : candidate.startsWith('/')
        ? candidate
        : pathResolve(parentPath, candidate);
    if (existsSync(abs)) {
      return nextResolve(pathToFileURL(abs).href, context);
    }
  }

  return nextResolve(specifier, context);
}
