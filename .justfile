install-modules:
    npm install @eslint/js eslint typescript-eslint wrangler

lint:
    eslint

fmt:
    prettier . --write

build:
    tsc
    npx cpx "src/**/*.{html,png,css}" dist/
    npx cpx "content/**" dist/content
    npx wrangler dev
