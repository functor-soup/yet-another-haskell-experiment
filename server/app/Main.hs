{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

import GHC.Generics

import Data.Aeson
import Web.Scotty


data Todo = Todo { id :: Int, work :: String } deriving (Generic, Show)
type TodoList = [Todo]

instance FromJSON Todo
instance ToJSON Todo


inMemoryStuff :: TodoList
inMemoryStuff = [Todo 1 "Learn Monad Transformers",
                 Todo 2 "Learn Lenses",
                 Todo 3 "Write a bittorrent client from scratch",
                 Todo 4 "Have a Haskell Adventure"]


routes :: ScottyM ()
routes = get "/" $ Web.Scotty.json inMemoryStuff


main :: IO ()
main = scotty 3000 routes 
