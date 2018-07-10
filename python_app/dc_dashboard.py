from flask import Flask, render_template, jsonify, redirect, send_file, request
from flask_pymongo import PyMongo
from functions import getRidOfId


dc_dashboard = Flask(__name__)
mongo = PyMongo(dc_dashboard)

@dc_dashboard.route('/')
def index():

    return render_template("index.html")


@dc_dashboard.route("/sports")
def sports():
    # from functions import getRidOfId

    capsdata = getRidOfId(mongo.db.capitals.find())
    natsdata = getRidOfId(mongo.db.nationals.find())
    
    all_data = [capsdata, natsdata]

    return jsonify(all_data)


#function to render sports graph in the index.html
@dc_dashboard.route('/templates/sports.html')
def show_sports():

    return send_file('templates/sports.html')


#function to render dc_maps in the index.html
@dc_dashboard.route('/templates/dc_map.html')
def show_map():

    return send_file('templates/dc_map.html')


@dc_dashboard.route('/templates/ratings.html')
def show_rate():

    return send_file('templates/ratings.html')


@dc_dashboard.route('/form', methods=["GET","POST"])
def form():
    import datetime

    if request.method == "POST":

        name = request.form["name"]
        rating = request.form["rating"]
        comment = request.form["comment"]
        date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        # date = ('2018-06-17')

        review = {'Name': name, 'Rating': rating, 'Comment': comment, 'Date': date}
        print(review)
        mongo.db.feedbacks.insert_one(review)
        
        return redirect("/", code=302)

    # return render_template('ratings.html')


@dc_dashboard.route('/rating')
def rating():
    import pandas as pd

    all_ratings = getRidOfId(mongo.db.feedbacks.find())

    df = pd.DataFrame.from_dict(all_ratings, orient='columns')
    df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%m/%d/%Y')
    df['Rating'] = pd.to_numeric(df['Rating'])
    rate = df.groupby('Date').mean().reset_index()
    rate['Rating'] = round(rate['Rating'],2)

    return jsonify(rate.to_dict(orient='records'))


@dc_dashboard.route('/grabtweets')
def grabtweets():
    # import time
    from nightlifetweets import getTweets
    
    nighttweets = getTweets()

    for x in nighttweets:
        mongo.db.nightlife.replace_one(x, x, upsert=True)
    print('tweets added')
    # time.sleep(3)

    tweets = getRidOfId(mongo.db.nightlife.find())
    return jsonify(tweets)


@dc_dashboard.route('/templates/tweets.html')
def show_tweets():

    return send_file('templates/tweets.html')


@dc_dashboard.route('/templates/entertainment.html')
def show_ent():

    return send_file('templates/entertainment.html')


@dc_dashboard.route('/templates/abra.html')
def show_liq():

    return send_file('templates/abra.html')


@dc_dashboard.route('/templates/ShotsMap.html')
def show_shots():

    return send_file('templates/ShotsMap.html')


if __name__ == "__main__":
    dc_dashboard.run(debug=True)


# @dc_dashboard.route('/gunshots')
# def getShots():

#     allshots = getRidOfId(mongo.db.gunshots.find())

#     return jsonify(allshots)


# @dc_dashboard.route('/singleshots')
# def getSingle():

#     single = getRidOfId(mongo.db.singlegunshot.find())

#     return jsonify(single)


# @dc_dashboard.route('/multishots')
# def getMulti():

#     multi = getRidOfId(mongo.db.multigunshot.find())

#     return jsonify(multi)


# @dc_dashboard.route('/arenas')
# def getArenas():

#     arenas = getRidOfId(mongo.db.arenas.find())

#     return jsonify(arenas)
