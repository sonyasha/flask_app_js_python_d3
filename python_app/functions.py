def getRidOfId(data):

    output = []
    for line in data:
        line.pop('_id')
        output.append(line)

    return output

    