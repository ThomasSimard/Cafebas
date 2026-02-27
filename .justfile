build:
    tsc
    npx cpx "src/**/*.{html,png,css}" dist/
    just docker

docker:
    sudo docker-compose down
    sudo docker-compose up -d