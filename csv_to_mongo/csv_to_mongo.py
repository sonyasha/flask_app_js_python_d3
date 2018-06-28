import csv
import glob
import pymongo

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.dc_app

filepaths = glob.glob('*.csv')

for filename in filepaths:
    with open(filename, 'r', newline='', encoding='latin-1') as csvfile:
        coll_name = filename[:-4]
        
        with open(filename) as csv_for_header:
            head_reader = csv.reader(csv_for_header)
            header = next(head_reader)

            csvreader = csv.DictReader(csvfile)
            for el in csvreader:
                row = {}
            
                for field in header:

                    row[field] = el[field]
                db[coll_name].replace_one(row, row, upsert=True)