git pull origin master

npm install

pm2 del WASServer

pm2 start npm -- start

pm2 restart npm --name WASServer

