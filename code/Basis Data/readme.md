# Freeing Basis Data With Node.js

## Information On Setup
Prior to running freeData.js the following install commands must be run in the directory that freeData.js resides.

*  cd/(freeDataDir) //changes directory to path specified in ()

*  npm install request //installs request module
*  npm install fs //installs fs module
*  npm install pg //installs pg module
*  npm install async //installs async module
*  npm install socket.io //installs socket.io module
*  npm install socket.io-client // installs socket.io-client module


## Information On Variables
1.  date - is set to pull the current date from the computer being used to run the script.
1.  outputFile - is set to be called "metrics.json". It is what the saved file will be called when saved.
1.  usr - is used as the username to be submitted for Basis account access,  put your user-name for basis account in here.
1.  psw - is used as the password to gain access to the user's Basis account, put your password for basis account in here.
1.  access_token - code response from server for authorizing data from internal API, no need to touch anything here (was tested on all browsers).
1.  freq - is the amount of time in between loops of the script run. Basis only updates metric data once per minute so although you can set it to be updated more frequently it is not necessary at this point in time.
1.  conString - is used to upload data into a database, insert your postgres database info here to connect (Use the following format: postgres://username:database@hostinfo:port/postgres")
1.  requestDate - is the cleaned and reformatted date that is then used to pull data from that date from the API
1.  heartArray - is an array of all heart rates gathered per freq.
1.  caloriesArray - is an array of all calorie gathered per freq.
1.  stepsArray - is an array of all steps taken gathered per freq.
1.  gsrArray - is an array of all GSR data gathered per freq.
1.  skin _ tempArray - is an array of all skin temps gathered per freq.
