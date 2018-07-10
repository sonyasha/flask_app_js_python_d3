def getRidOfId(data):

    output = []
    for line in data:
        line.pop('_id')
        output.append(line)

    return output

def getTweets():

    import pandas as pd
    import tweepy
    # from python_app.config import consumer_key, consumer_secret, access_token, access_token_secret
    import os

    consumer_key = os.environ.get('consumer_key')
    consumer_secret = os.environ.get('consumer_secret')
    access_token = os.environ.get('access_token')
    access_token_secret = os.environ.get('access_token_secret')
    
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

    target_terms = ["@Codmother", "@rocknrollhotel", "@NelliesDC",
                   "@WhiskeysDC", "@Whitlows","@thepugdc", "@WhatsUpAtTown",
                   "@dontitova", "@ATownBallston", "@18thSTLounge", "@TheBrixtonDC",
                   "@provisiondc", "@SollysDC", "@VelvetLoungeDC", "@DachaDC", "@TheWonderlandDC",
                   "@930Club"]

    bar = []
    tweet_text = []
    date = []

    for target in target_terms:
        print(f'grabbing {target}')

        oldest_tweet = None

        for x in range(1):

            public_tweets = api.search(target, count=3, result_type="recent", max_id=oldest_tweet)

            for tweet in public_tweets["statuses"]:
                bar.append(target)
                tweet_text.append(tweet['text'])
                date.append(tweet['created_at'])
                oldest_tweet = tweet["id"] - 1
                # print(tweet)


    nightlife_df=pd.DataFrame({"Bar": bar,
                              "Tweet": tweet_text,
                              "Date": date})

    nightlifetweets=nightlife_df.to_dict('records')
    
    return nightlifetweets


    