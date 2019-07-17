from flask import Flask, jsonify, request
from flask.ext.cors import CORS, cross_origin
from bson.objectid import ObjectId
import datetime
import random

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})

def filter_return_objects(return_objects, query, severity, component):
    if severity:
        return_objects = list(filter(lambda x: x['severity'] == severity, return_objects))
    if component:
        return_objects = list(filter(lambda x: x['component'] == component, return_objects))
    if query:
        return_objects = list(filter(lambda x: query in x['details'], return_objects))
    return return_objects

@app.route('/')
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def hello_world():
    query =  request.args.get('query')
    severity = request.args.get('severity')
    component = request.args.get('component')
    print("Query: %s\nSeverity: %s\nSystem: %s" % (query, severity, component))

    really_long_text_string = "[conn%s] Lorem ipsum dolor sit amet, consectetuer adipiscing elit. " \
                              "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque " \
                              "penatibus et magnis dis parturient montes, nascetur ridiculus mus. " \
                              "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. " \
                              "Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, " \
                              "vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, " \
                              "justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt." \
                              "Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. " \
                              "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. " \
                              "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. " \
                              "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. " \
                              "Aenean imperdiet. Etiam ultricies nisi vel augue. " \
                              "Curabitur ullamcorper ultricies nisi. " \
                              "Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, " \
                              "sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, " \
                              "blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt" \
                              " tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit " \
                              "amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh."
    return_objects = []
    severities = ['F', 'E', 'W', 'I', 'D']
    components = ["ACCESS", "COMMAND", "CONTROL", "FTDC", "GEO",
               "INDEX", "NETWORK", "QUERY", "REPL", "REPL_HB",
               "ROLLBACK", "SHARDING", "STORAGE", "RECOVERY",
               "JOURNAL", "TXN", "WRITE"]

    for x in range(1000):
        return_objects.append(
            {
                "date": datetime.datetime.utcnow().isoformat(),
                "_id": str(ObjectId()),
                "severity": severities[random.randint(0, 4)],
                "component": components[random.randint(0,14)],
                "details": (really_long_text_string % random.randint(1000,9999))[:random.randint(30,400)],
                "host": "hoststring-%s" % random.randint(100,999)
            })

    return_objects = filter_return_objects(return_objects, query, severity, component)

    return jsonify(return_objects)