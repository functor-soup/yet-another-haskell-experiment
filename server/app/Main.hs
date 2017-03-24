{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

import GHC.Generics
import Data.Aeson
import Web.Scotty
import Control.Applicative
import Control.Monad.IO.Class
import Database.SQLite.Simple
import Database.SQLite.Simple.FromRow
import System.Environment
import Network.Wai.Middleware.RequestLogger


data Todo = Todo { id :: Int, work :: String } deriving (Generic, Show)
type TodoList = [Todo]

instance FromJSON Todo
instance ToJSON Todo

instance FromRow Todo where
  fromRow = Todo <$> field <*> field

instance ToRow Todo where
  toRow (Todo id_ str) = toRow (id_, str)


-- queries
queryAll :: Query
queryAll =  "SELECT * from test"

insertInto :: Query
insertInto = "INSERT INTO test (str) VALUES (?)" 


throwDataAtClient :: Connection -> ActionM()
throwDataAtClient conn = do
                           rows <- liftIO (query_ conn queryAll) :: ActionM [Todo] 
                           Web.Scotty.json rows   


insertData :: Connection -> ActionM ()
insertData conn = do
                     dat <- jsonData :: ActionM Todo
                     liftIO $ execute conn insertInto $ Only (work dat)
                     html "Done deal" 
                    

routes :: Connection -> ScottyM()
routes conn = get "/" (throwDataAtClient conn) >>
              post "/post" (insertData conn)

main :: IO ()
main = do
        port <- fmap (maybe 3000 read) (lookupEnv "PORTZ") :: IO Int
        conn <- open "test.db"
        scotty port $ (middleware logStdoutDev >> routes conn)
