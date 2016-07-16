psql --host=basisdata.cruj1d5neyqx.us-west-2.rds.amazonaws.com --port=5432 --username=barb --password --dbname=postgres

basisdata.cruj1d5neyqx.us-west-2.rds.amazonaws.com:5432

barb
basisdata

CREATE TABLE barbData(
    time timestamp DEFAULT current_timestamp NOT NULL,
    heartrate
    calories
    steps
    gsr
    skin_temp
)
