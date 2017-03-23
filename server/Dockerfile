FROM haskell:8

ENV PORTZ=5000

COPY . /

RUN stack install
RUN stack build
RUN chmod +x sqliteStuff.sh
RUN ./sqliteStuff.sh
EXPOSE 5000
WORKDIR /
CMD .stack-work/dist/x86_64-osx/Cabal*/build/server-exe/server-exe
