module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
    rules: {
        'space-before-function-paren': ['error', 'always'],
        '@typescript-eslint/space-before-function-paren': ['error'],
        'object-curly-newline': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        'space-before-function-paren': 'off',
        'linebreak-style': 'off',
        indent: 'off',
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
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['./src'],
            },
        },
    },
};
