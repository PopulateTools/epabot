# epabot
This is [a bot](https://twitter.com/epabot) that tweets persons from the Spanish [EPA](http://www.ine.es/en/prensa/epa_prensa_en.htm) survey microdata. It's inspired in [@censusamericans](https://twitter.com/censusamericans), which does the same with the US Census.

## Getting started
The architecture is borrowed from the [censusAmericans](https://github.com/jjjiia/censusAmericans) repo. There's a pregenerated text file with the tweet list which is tweeted periodically using the [EverywordBot](https://github.com/aparrish/everywordbot) framework.

### Prepare the data
Clone or fork the project and go to the `data` folder. Run the R script to download and transform the microdata to a nice, tidy CSV.

Now you can open your terminal and generate the tweet list! Go to the root folder and run `npm install` to get the dependencies. Run `node index.js` to get the file with all the tweets.

### Send the tweets
You should register an account and an app via the Twitter interface. You can find a tutorial [here](https://github.com/aparrish/everywordbot#obtaining-twitter-authorization-credentials).

Afterwards, run on your terminal this command with your credentials:
```
$ python3 epabot.py --consumer_key=FILL_WITH_YOURS --consumer_secret=FILL_WITH_YOURS \
      --access_token=FILL_WITH_YOURS --token_secret=FILL_WITH_YOURS \
      --source_file=tweet_list.txt --index_file=index.txt
```

Ideally this should run periodically from a bash script on a server using cron.

## Requirements
- R with the [MicroDatosEs](https://www.datanalytics.com/2012/08/06/un-paseo-por-el-paquete-microdatoses-y-la-epa-de-nuevo/) package installed.
- node.js
- python3
- tweepy

### Hey, but what is the EPA?
The EPA, a.k.a. the Spanish Economically Active Population Survey, is a survey done by the Spanish Statistics Institute every three months.

It's the best data source regarding employment in Spain, and the microdata contains nearly 160.000 individual interviews.
