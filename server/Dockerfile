FROM haskell:8

ENV PORTZ=5000

COPY . /

RUN apt-get -y update
RUN apt-get install -y sqlite3

WORKDIR /
RUN chmod +x sqliteStuff.sh
RUN ./sqliteStuff.sh

RUN stack install
RUN stack build
EXPOSE 5000
CMD stack exec server-exe
