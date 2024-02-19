FROM golang:1.21.6 AS builder
WORKDIR /app
COPY . .
RUN go get -d
RUN go build -o main .

FROM alpine:latest AS production
WORKDIR /app
COPY --from=builder /app/main .
CMD [ "/app/main" ]