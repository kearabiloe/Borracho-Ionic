import json,httplib,urllib
connection = httplib.HTTPSConnection('ac-parse-server.herokuapp.com', 443)
params = urllib.urlencode({"distinct":"score"})
connection.connect()
connection.request('GET', '/parse/aggregate/GameScore?%s' % params, '', {
	"X-Parse-Application-Id": "Borracho",
	"X-Parse-Master-Key": "9dfXAIzaSyVj4YX9oc9hbwYyi0r",
	"X-Parse-REST-API-Key": "${REST_API_KEY}"
	})
result = json.loads(connection.getresponse().read())
print result