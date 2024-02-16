FROM golang:1.21.6 AS builder
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN go get -d
RUN go build -o main .

FROM alpine:latest AS production
COPY --from=builder /app .
CMD [ "./main.go" ]