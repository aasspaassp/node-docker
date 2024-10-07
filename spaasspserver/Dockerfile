# syntax=docker/dockerfile:1

FROM golang
WORKDIR /app
COPY go.mod ./
COPY ./dist ./dist
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /spaassp-server
EXPOSE 8080
CMD ["/spaassp-server"]