import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    // Astro's required env.d.ts pattern needs a triple-slash reference to its
    // generated ambient types — not expressible as an `import`.
    files: ['**/env.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
  { rules: { 'no-console': ['warn', { allow: ['warn', 'error'] }] } },
  { ignores: ['dist/**', 'node_modules/**', '.astro/**'] },
];
