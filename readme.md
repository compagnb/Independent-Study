## Independent Study Documentation
**Faculty:** Aaron Hill
**Semester:** Spring/Summer 2017
**Cloud 9 Enviornment Link:**
**Complimenting Github Repos:**

## Table of Contents


## Concept
The goal of this independent study was to pin point life events through biometric data. This required the analysis of wearable technology which recorded biometric data, metrics provided from the device, the structure of this data in regards to a database, as well as research into APIs, and machine learning methods to pin point these events on an ongoing (live feed) basis.

## Research of Wearable Technology
While devices like the Neurosky, Emotive Epoc, and Open BCI, have the ability to provide electrical impulses from the brain (neural ossilations), the complexity of wearing one for long periods of time eliminated the possibility of using it for this study. The wrist is a more convenient area for collecting data, hence the following devices were evaluated.

**SAMSUNG GEAR FIT & GEAR 2:** Samsung Gear 2 provides personalized real-time information on the users heart rate using an optical heart rate sensor. Sensors included within this device are: accelerometer, gyroscope, and an optical heart rate sensor as previously stated. This device is only compatible with certain Samsung devices and some health-related apps. It does offer a developer API.

**APPLE iWATCH:** The Apple Watch is designed to perform throughout the day. Similar to Samsung devices, it only has an accelerometer and a heart rate sensor built into the device. By synchronizing it to the iPhone, the only compatible device, it also has the ability to gather GPS data and transmit the data recorded to some health-related apps. Although it too offers a developer tool, it is useless without an iPhone.

**FIT BIT CHARGE HR:** The Charge HR is designed to help users track exercise to optimize weight loss. It has internal memory to store data if out of range from synchronizing to proprietary servers through any smart phone with bluetooth LTE 4.0. Its sensors include: an optical heart rate monitor, 3-axis accelerometer, and an altimeter. Fit Bit offers access through their proprietary API.

**JAWBONE UP 3:** Up 3 is also designed to help users modify their sleep and weight habits. This device also utilizes any smart phone with bluetooth LTE 4.0 to transmit data to the company servers. Sensors that are included are: 3-axis accelerometer, heart rate, respiration, and galvanic skin response (GSR). While Jawbone offers API access it only supplies averaged metric data, without access to all raw metrics. Further research into this device produced evidence of inaccuracy within its GSR sensor.

**BASIS PEAK:** The Peak uses proprietary software to help the user make changes to sleep or activity patterns. The Peak automatically adjusts weekly goals based on user performance. It offers notifications for being more active, sleeping more/less, or burning more calories. The sensors included in this device are: optical heart rate sensor, GSR, skin temperature, 3-axis accelerometer. This device has a 4 day battery life and transmits data with the aide of any smart phone with bluetooth LTE 4.0. This device does not have an open API where users can access their own data. All data must be accessed through their proprietary software. According to further research this tracker seemed to offer the most accurate data in comparison to professional medical measurements.

Due to the simplicity of use, multitude of sensors (heart rate, GSR, movement) as well as their accuracy the The Basis Peak was utilized for this study.


## Process
### Freeing Basis Data With Node.js
Since Basis does not offer any API access, alternate methods of gathering data were needed. To supply the data within its proprietary web application the company uses a rest API. The first step in freeing the raw data for all users is to gain access to this rest API.

The first script build used the 'request' module in node to log into the Basis web application. By using POST to submit the username and password to the login page, access to the data can then be pulled from the restful API. This task required the most work, and research. In order to gain access, an access token was needed. This token needed to be fetched from the cookies within the browser. Once it was obtained it needed to be cleaned before it would work correctly.

After modifying the basic script, features to pull from the current date, at the current minute were added. Finally, the last modification was made to upload the data into a postgres database.

#### Script Variables
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

Additional Information on this script, including how to set it up can be found in the [basisExport] repo made for this study. (https://github.com/compagnb/basisExport)

### Data Structures
### Machine Learning
### Exporting

## Status

## Next Steps
