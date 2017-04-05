{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

import GHC.Generics

import Web.Scotty
import System.Environment
import System.Random
import System.Directory
import qualified Network.Wreq as W
import Data.Aeson 
import Control.Monad.IO.Class
import Control.Lens
import Network.Wai.Middleware.RequestLogger
import Network.Wai.Middleware.Static

locationOfFrontend :: String
locationOfFrontend = "/../frontend/dist"

type DataRoute = String

data Todo = Todo { id :: Int, work :: String } deriving (Generic, Show)

instance ToJSON Todo
instance FromJSON Todo

data Todoink = Todoink { job :: String } deriving (Generic, Show)

instance FromJSON Todoink


clientGet :: DataRoute -> ActionM ()
clientGet url = do
                 jsonResp <- liftIO $ fmap (^. W.responseBody) (W.get url)
                 let resp = decode jsonResp :: Maybe [Todo]
                 case resp of (Just x) -> Web.Scotty.json x 
                              Nothing  -> Web.Scotty.json ("Dang it .. something broke" :: String)


clientPost :: DataRoute -> ActionM ()
clientPost url = do
                   dat <- jsonData  :: ActionM Todoink
                   (id ,_) <- liftIO (fmap random newStdGen)
                   let dataToBeSent = Todo id (job dat)
                   _ <- liftIO $ W.post url $ encode dataToBeSent
                   Web.Scotty.json ("Sent!!" :: String)
                   

routes :: DataRoute -> ScottyM()
routes x = (get "/data" $ clientGet x) >>
           (post "/data" $ clientPost x) 


serveFront :: String -> ScottyM()
serveFront x = get "/" $ file (x ++ locationOfFrontend ++ "/index.html")


staticMiddleware :: String -> ScottyM()
staticMiddleware  x = middleware . staticPolicy . addBase $ x


main :: IO ()
main = do
         cwd <- getCurrentDirectory 
         scotty 4000 $ (middleware logStdoutDev >> 
              staticMiddleware (cwd++locationOfFrontend) >>
              routes "http://localhost:5000" >> 
              serveFront cwd)
