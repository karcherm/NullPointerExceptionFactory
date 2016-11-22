call npm install -g bower gulp

cd server
call npm install
cd ..

cd player
call npm install
call gulp compile
cd ..

cd screen
call npm install
call gulp compile
cd ..
