module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic',
    '@next/eslint-plugin-next',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'next',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'project': './tsconfig.json',
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  rules: {
    'func-call-spacing': 'off',
    camelcase: 'off',
    semi: ['error', 'always',
      {
        omitLastInOneLineBlock: true,
        omitLastInOneLineClassBody: true,
      },
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'dot-location': ['error', 'property'],
    'array-bracket-spacing': ['error', 'never'],
    'linebreak-style': 'off',
    'max-statements-per-line': ['error', { max: 1 }],

    'max-len': ['error',
      {
        code: 110,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'multiline-ternary': ['error', 'always-multiline'],
    'new-parens': 'error',
    'no-floating-decimal': 'error',
    'no-mixed-operators': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-whitespace-before-property': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'no-multi-spaces': 'error',
    'object-curly-newline': ['error', {
      multiline: true,
      minProperties: 4,
      consistent: true,
    }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'object-curly-spacing': ['error', 'always'],
    'one-var-declaration-per-line': ['error', 'initializations'],
    'operator-linebreak': ['error', 'after'],
    'quote-props': ['error', 'as-needed'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'space-in-parens': ['error', 'never'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'prefer-spread': 'off',

    // import
    'sort-imports': ['error', {
      'ignoreCase': true,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
    }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],

    // JSX
    '@stylistic/jsx-child-element-spacing': 'error',
    '@stylistic/jsx-curly-spacing': [2, {
      when: 'always',
      children: true,
      objectLiterals: 'never',
    }],
    '@stylistic/jsx-curly-newline': ['error', {
      multiline: 'consistent',
      singleline: 'consistent',
    }],
    '@stylistic/jsx-closing-bracket-location': [1, 'tag-aligned'],
    '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    '@stylistic/jsx-closing-tag-location': 'error',
    '@stylistic/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'proportional-always',
    }],
    '@stylistic/jsx-curly-brace-presence': ['error', {
      props: 'never',
      children: 'never',
      propElementValues: "always",
    }],
    '@stylistic/jsx-self-closing-comp': ['error', {
      component: true,
      html: true,
    }],
    '@stylistic/jsx-max-props-per-line': [1, {
      when: 'always'
    }],
    "@stylistic/jsx-first-prop-new-line": 'error',
    "@stylistic/jsx-pascal-case": ['error', {
      allowNamespace: true
    }],
    '@stylistic/jsx-wrap-multilines': ['error', {
      declaration: 'parens',
      assignment: 'parens',
      return: 'parens',
      arrow: 'parens',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore',
      propertyValue: 'ignore',
    }],

    // react-query
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
  },
};
