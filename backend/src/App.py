from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb+srv://cuba900:taller841@cluster0.muaqz.mongodb.net/apicardb?retryWrites=true&w=majority'
mongo = PyMongo(app)

CORS(app)


@app.route('/cars', methods=['POST'])
def createCar():
    name = request.json['name']
    model = request.json['model']
    year = request.json['year']
    fuel = request.json['fuel']
    origin = request.json['origin']
    setup = request.json['setup']
    price = request.json['price']

    if name and model and year and fuel and origin and setup and price:
        id = mongo.db.cars.insert_one(
            {'name': name, 'model': model, 'year': year, 'fuel': fuel, 'origin': origin, 'setup': setup, 'price': price}
        )
        response = {
                'id': str(id),
                'name': name,
                'model': model,
                'year': year,
                'fuel': fuel,
                'origin': origin,
                'setup': setup,
                'price': price
        }
        return response
    else:
        return not_found()

    return {'message': 'received'}

@app.route('/cars', methods=['GET'])
def getCars():
    cars = []
    for doc in mongo.db.cars.find():
        cars.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'model': doc['model'],
            'year': doc['year'],
            'fuel': doc['fuel'],
            'origin': doc['origin'],
            'setup': doc['setup'],
            'price': doc['price']
        })
    return jsonify(cars)   
    
@app.route('/cars/<id>', methods=['GET'])
def getCar(id):
    car = mongo.db.cars.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(car)
    return Response(response, mimetype="application/json") 

@app.route('/cars/<id>', methods=['DELETE'])
def deleteCar(id):
    mongo.db.cars.delete_one({'_id': ObjectId(id)})
    response = jsonify({'message': 'O Carro com id ' + id + ' foi apagado com sucesso'})
    return response 

@app.route('/cars/<id>', methods=['PUT'])   
def updateCar(id):
    name = request.json['name']
    model = request.json['model']
    year = request.json['year']
    fuel = request.json['fuel']
    origin = request.json['origin']
    setup = request.json['setup']
    price = request.json['price']

    if name and model and year and fuel and origin and setup and price:
        mongo.db.cars.update_one({'_id': ObjectId(id)}, {'$set': {
            'name': name,
            'model': model,
            'year': year,
            'fuel': fuel,
            'origin': origin,
            'setup': setup,
            'price': price
        }})
        response = jsonify({'message': 'O Carro ' + id + ' foi atualizado com sucesso'})
        return response
    

@app.errorhandler(404)    
def not_found(error=None):
    response = jsonify({
        'message': 'Resource Not Found: ' + request.url,
        'status': 404   
    })
    response.status_code = 404
    return response

if __name__ == "__main__":
    app.run(debug=True)