# def getCapsNatsData(c,n):

#     caps = []
#     for line in c:
#         line.pop('_id') #id is not a string and can't be jsonified
#         caps.append(line)
    
#     nats = []
#     for line in n:
#         line.pop('_id')
#         nats.append(line)
    
#     # capsdict = {'years': [line['Season'] for line in caps], 'wins': [int(line['W']) for line in caps],\
#     #             'attendance': [int(line['Attendance']) for line in caps], 'comments': [line['Playoffs'] for line in caps]}

#     # natsdict = {'years': [line['Year'] for line in nats], 'wins': [int(line['W']) for line in nats],\
#     #             'attendance': [int(line['Attendance']) for line in nats], 'comments': [line['Topplayer'] for line in nats]}

#     all_data = [caps, nats]

#     return all_data

def getRidOfId(data):

    output = []
    for line in data:
        line.pop('_id')
        output.append(line)

    return output

    