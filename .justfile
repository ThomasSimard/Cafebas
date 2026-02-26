
start:
    npx browser-sync start --server "build" --files "css/*.css, *.html" --port 8000

build:
    npm run build