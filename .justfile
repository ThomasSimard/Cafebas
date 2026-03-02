install-modules:
    npm install @eslint/js eslint typescript-eslint

lint:
    eslint

fmt:
    prettier . --write

build:
    tsc
    npx cpx "src/**/*.{html,png,css}" dist/
    npx cpx "content/**" dist/content
    just docker

docker:
    docker-compose down
    docker-compose up -d