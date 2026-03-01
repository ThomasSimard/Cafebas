install-modules:
    npm install @eslint/js eslint typescript-eslint

lint:
    eslint

fmt:
    prettier --check . 

build:
    tsc
    npx cpx "src/**/*.{html,png,css}" dist/
    just docker

docker:
    docker-compose down
    docker-compose up -d