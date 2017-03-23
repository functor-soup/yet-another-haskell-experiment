### Just another Haskell Experiment
As grandiose as this sounds this is just another  haskell experiment of mine.
Best move along as this experiment does not involve anything objectively new.

This is just for me to get better acquainted with Haskell and Scotty and Wreq and a 
pinch of Lens

If you've chosen to stay here's the lay of the land


```

            browser
              /| |
GET frontend   | |  POST json
               | |/
      |---------------|
      |               |
      | server-client |
      |               |
      |---------------|
             /| |
GET json vals | |  POST json
              | |/
      |-----------------|
      |    server       |
      |                 |
      |-----------------|
```
