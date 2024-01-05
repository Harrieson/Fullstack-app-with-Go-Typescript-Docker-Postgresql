FROM golang:1.20
WORKDIR /app

COPY . .


#Download and Install Deps 

RUN go get -d -v ./...

#Build the app

RUN go build -o api .


EXPOSE 8000

CMD [ "./api" ]