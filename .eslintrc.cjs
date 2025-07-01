const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    overrides: [
        {
            files: ['*.js', '*.cjs', '*.vue'],
            rules: {
                'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
                'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
                'vue/multi-word-component-names': 'off',
                'no-undef': 'off',
                'no-throw-literal': 'off' // добавлено правило
            }
        }
    ]
});
