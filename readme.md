## Independent Study Documentation

**Faculty:** Aaron Hill

**Semester:** Spring/Summer 2017

**Cloud 9 Enviornment Link:**

**Complimenting Github Repos:**


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


## Data Structures
### Original Biometric Data Structures
*   The original structure pulled from the Basis API is represented in the following hierarchy:

        <{
          "metrics": {
              "heartrate": {
                  "values": [
                      Heart rate for each min,
                      Recorded as whole number,
                      Sample: 1-200 or null
                  ]
              },
              "calories": {
                  "values": [
                      Calories burned for each min,
                      Recorded as decimal,
                      Sample: 0.5 - 200.5 or null
                  ]
              },
              "steps": {
                  "values": [
                      Calories burned for each min,
                      Recorded as decimal,
                      Sample: 0.5 - 200.5 or null
                  ]
              },
              "gsr": {
                 "values": [
                      Calories burned for each min,
                      Recorded as decimal,
                      Sample: 0.000005 - 2.5 or null
                  ]
              },
              "skin_temp": {
                 "values": [
                      Calories burned for each min,
                      Recorded as decimal,
                      Sample: 70.5 - 200.5 or null
                  ]
              },
              "air_temp": {
                 "values": [
                      Calories burned for each min,
                      Recorded as decimal,
                      Sample: 70.5 - 200.5 or null
                  ]
              }
          },
          "endtime": 1454907540,
          "starttime": 1454821200,
          "interval": 60,
          "timezone_history": [
              {
                  "timezone": "America/New_York",
                  "start": 1454821200,
                  "offset": -5
              }
            ]
          }>
*   [Information as Json Object](https://github.com/compagnb/thesis/blob/master/work/bioMetrics.json)
*   [Information as CSV File](https://github.com/compagnb/thesis/blob/master/work/bioMetrics.csv)

### Re-structured Biometric Data Structures
*   To make this a simpler structure for pulling data within a postgres database this data was restructured into the following format (all numbers were kept either as whole or decimal):

        <Table Name: User Name Metrics
        Row 1: Time1, Heart rate at time1, Calories at time1, Step at time1, GSR at time1, Skin temperature at time1
        Row 2: Time2, Heart rate at time2, Calories at time2, Step at time2, GSR at time2, Skin temperature at time2
        Row 1: Time3, Heart rate at time3, Calories at time3, Step at time, GSR at time3, Skin temperature at time3
        >

### Journal Data Structures
*   In order to build a program that was able to pull out events within this data, training data needed to be introduced. To gather this data users were asked to keep a journal of their daily activities and feelings in a Google spreadsheet which was then to be inserted into a database as well. This would eventually be an on-line journal that would record directly into the database for training as needed. The structure of this data took place as the following:

        <Table Name: User Name Journal
        Row 1: Date, Start-Time, End-Time, Activity, General Emotion, Excitement on a scale from 1 - 10, Happiness on a scale from 1 - 10, Calmness on a scale from 1 - 10, Anxiousness on a scale from 1 - 10, Sadness on a scale from 1 - 10, Anger on a scale from 1 - 10, Hunger on a scale from 1 - 10, Sleepiness on a scale from 1 - 10, Bored on a scale from 1 - 10
        Row 2: Date, Start-Time, End-Time, Activity, General Emotion, Excitement on a scale from 1 - 10, Happiness on a scale from 1 - 10, Calmness on a scale from 1 - 10, Anxiousness on a scale from 1 - 10, Sadness on a scale from 1 - 10, Anger on a scale from 1 - 10, Hunger on a scale from 1 - 10, Sleepiness on a scale from 1 - 10, Bored on a scale from 1 - 10
        >
*   [Information as Google Doc](https://docs.google.com/a/newschool.edu/spreadsheets/d/1IoeD4Y-Y1wn7yR7ErYVW-bRPtl2fr9DiImzAYxdMwBw/edit?usp=sharing)
*   [Information as CSV File](https://github.com/compagnb/thesis/blob/master/work/journal.xlsx)


## Freeing Basis Data With Node.js
Since Basis does not offer any API access, alternate methods of gathering data were needed. To supply the data within its proprietary web application the company uses a rest API. The first step in freeing the raw data for all users is to gain access to this rest API.

The first script build used the 'request' module in node to log into the Basis web application. By using POST to submit the username and password to the login page, access to the data can then be pulled from the restful API. This task required the most work, and research. In order to gain access, an access token was needed. This token needed to be fetched from the cookies within the browser. Once it was obtained it needed to be cleaned before it would work correctly.

After modifying the basic script, features to pull from the current date, at the current minute were added. Finally, the last modification was made to upload the data into a postgres database.

### Script Variables
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

### Additional Information on this script, including how to set it up can be found in the following links:
*   [Free Data From Internal API Using Node.js](https://github.com/compagnb/basisExport)
*   [Upload Biometric Data To Database Using Node.js](https://github.com/compagnb/basisExport)


## Machine Learning
The first version of this script pulled all data from the database holding biometric data. Due to a miscalculation on how often the Basis synchronizes data (from every minute to approximately every 10-15 minutes), this feature was removed going forward.

Since the data was no longer being pulled from the database, data used in the python for training was pulled from the Basis API in the form of a single CSV document per day, per category of data (metrics, activity, sleep). These were then consolidated into three different tables within python with the following custom function:

            <  def loadMetricData(user, directory):
                path =  user + "/" + directory + "/"
                all_files = glob.glob(os.path.join(path, "*.csv"))
                data = pd.DataFrame()
                list_ = []
                for file_ in all_files:
                    data = pd.read_csv(file_,index_col=None, header=0)
                    list_.append(data)
                    data = pd.concat(list_)
                return data
                >

Once this data was imported into three different tables within python, data was cleaned, removing any rows of time that did not have biometric data attached. This was time the user(s) spent charging the device, showering, or the device was unable to fetch data. Times recorded were reformatted into unix format.

The journal was exported as a CSV and also imported as a table as well. This data was cleaned, reformatting the date and time as well as inserting "0" for any null value. Boolean values were created for each emotion recorded in the journal above 4.

To add all of the tables into one master the following function was used to insert the data from the start time to the end time for each emotion, activity, or state of sleep.

            <
            def makeIndicators(newvar, metricData, journalData, journal_startdatetime_loc, journal_enddatetime_loc, journal_activity_loc):

                metricData[newvar] = False

                for i in range(0, journalData.shape[0]):
                    metricData['xlt'] = (metricData['timestamp'] >= pd.to_datetime(journalData.iloc[i, journal_startdatetime_loc]))
                    metricData['xgt'] = (metricData['timestamp'] <= pd.to_datetime(journalData.iloc[i, journal_enddatetime_loc]))
                    metricData['xw'] = (journalData.iloc[i, journal_activity_loc] == True)
                    metricData['xsum'] = metricData['xlt'].astype(int) + metricData['xgt'].astype(int) + metricData['xw'].astype(int)
                    metricData.loc[metricData['xsum']==3, newvar] = True

                metricData = metricData.drop(['xlt', 'xgt', 'xw', 'xsum'], axis=1)
                return metricData
            >

At this point there were some discrepancies noted within the journal data and the sleep and activity data. Since this information was not raw data and predicted from Basis's own training program, it was dropped from usage. Columns for month, day, hour and minute were created. Then the data was trained by using only data that would be gathered from the Basis ( heartrate, steps, calories, gsr, skintemp, airtemp, weekday, month, hour, curmin ) as features against the presence of each emotion.

At first, results seemed too good to be true giving a high percentages of true positive and accuracy. After a flaw was found in time calculation this accuracy and true positive rate dropped drastically. The feature "minutes" was dropped as it seemed to be less likely to have a high correlation between what minute, rather then hour. Since the data used all came from within the same month, month was also dropped. Iterations were also increased. With little effect, emotions were grouped into positive and negative.

Using a larger number of iterations and grouped emotions, percentage was increased to 38% accuracy in the regression model. Coefficients were then exported and used within the visualization for the data.

### Additional Information on this script, including each user's outcomes can be found in the following link:
*   [Predicting Emotional Responses With Biometric Data](https://github.com/compagnb/IS_Emotion_ML)


## Front End & Utilizing Coefficients
After exporting the coefficients and intercept from the python script, it was plugged into the d3.js script to create a visualization. The coefficients were brought in as an array and the intercept as its own variable. This required a function to build a number using all of the data, similar to predicting salary using regression methods.

            <
                function getSubser(d){
                  var score = intercept + calCo(d["heartrate"], coefficients[0]) + calCo(d["steps"], coefficients[1]) + calCo(d["calories"], coefficients[2]) + calCo(d["gsr"], coefficients[3]) + calCo(d["skintemp"], coefficients[4]) + calCo(d["airtemp"], coefficients[5]) + calCo(d["weekday"], coefficients[6]) + calCo(d["hour"], coefficients[7])

                  return {
                  wkDay: d["weekday"],
                  hour: d["hour"],
                  mins: d["min"],
                  heartrate: d["heartrate"],
                  steps: d["steps"],
                  calories: d["calories"],
                  gsr: d["gsr"], skintemp:
                  d["skintemp"],
                  airtemp: d["airtemp"],
                  intcept: intercept,
                  hco: calCo(d["heartrate"], coefficients[0]),
                  stepco: calCo(d["steps"], coefficients[1]),
                  calco: calCo(d["calories"], coefficients[2]),
                  gsrco: calCo(d["gsr"], coefficients[3]),
                  skinco: calCo(d["skintemp"], coefficients[4]),
                  airco: calCo(d["airtemp"], coefficients[5]),
                  wkdco: calCo(d["weekday"], coefficients[6]),
                  hrco: calCo(d["hour"], coefficients[7]),
                  // minco: calCo(d["min"], coefficients[8]),
                  score: score,
                  sigscore: sigmoid(score)

                  }
                }
            >


Using a function to calculate the sigmoid score a percentage of how "positive" or "negative" the emotion was for that point in time. This score later determined what emoji would be shown in the visualization.

            <
             function sigmoid(t) {
               return 1/(1+Math.pow(Math.E, -t));
             }

             function calCo(co, num){
               return co*num
             }
            >

### Additional Information on this script, including each user's outcomes can be found in the following link:
*   ["feelin' it" Visualization](https://compagnb.github.io/thesis/self.html)
*   [Data About "feelin' it"](https://github.com/compagnb/thesis)


## Evaluation & Next Steps
As the semester ended, I felt as though if more data was gathered on the subjects, a better prediction could be made. Two of the subjects kept the Basis on from April through June. Due to technical difficulties with international travel, there was not a huge difference in outcome with the additional data.

While at the Experimental Technologies conference, alternate forms of wearable technologies were explored. The "E5", which is used in medical studies for predicting seizures as well as those involving autistic children at MIT, seems to be ideal to gather this data most accurately. This is a possibility after its release in September. Until this device is available, or there is an update on the technical issues Basis is having with their hardware (burns), any updates on increasing the prediction will be put on hold.

In the mean time, revisions will be made within the project. The journal will be made as an on-line responsive tool. This will allow for a more streamline journal to be kept by all users on whatever platform they have available. It will provide a more efficient method of importing and streamlining work flow for the data training in python when needed. In addition, the emotion categories will be revisited focusing mainly on anxiety. Narrowing down the emotion category, allows a more focused tool to be made. The test users, making up the focus group for data training, will be those suffering from anxiety disorders, such as PTSD. This will most-likely be tied into work done on a project called "sessions".

### Additional Information on "sessions", including each user's outcomes can be found in the following link:
*   ["sessions"](https://sessions.parsons.edu)
*   [Data About "sessions"](https://github.com/compagnb/compagnb_thesis2015)


