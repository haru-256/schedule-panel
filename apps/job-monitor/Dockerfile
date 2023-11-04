# builder
FROM golang:1.21.3-bullseye as deploy-builder
WORKDIR /app
COPY src/go.mod src/go.sum ./
RUN go mod download
COPY src/ .
RUN go build -trimpath -ldflags "-w -s" -o app

# deploy
FROM debian:bullseye-slim as deploy
RUN apt-get update
COPY --from=deploy-builder /app/app .
CMD [ "./app" ]

# dev
FROM golang:1.21.3 as dev
WORKDIR /app
RUN go install github.com/cosmtrek/air@latest
CMD ["air"]
