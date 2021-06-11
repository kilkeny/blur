module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
    rules: {
        'space-before-function-paren': ['error', 'always'],
        '@typescript-eslint/space-before-function-paren': ['error'],
        'object-curly-newline': 'off',
        'linebreak-style': 'off',
        indent: 'off',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/indent': [
            'warn',
            4,
            {
                ignoredNodes: ['JSXElement *', 'JSXElement'],
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'import/prefer-default-export': 'off',
        'arrow-body-style': ['warn', 'as-needed'],
        'no-tabs': [
            'error',
            {
                allowIndentationTabs: true,
            },
        ],
    },
};
