from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId, InvalidId

app = Flask(__name__)
CORS(app)


# MongoDB connection
client = MongoClient('mongodb+srv://matbbiji:123@taskmanager.frv2k.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager')
db = client['task_manager']
tasks_collection = db['tasks']
categories_collection = db['categories']
priorities_collection = db['priorities']

# Routes for CRUD operations for tasks
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    due_date = data.get('due_date')
    if due_date:
        try:
            datetime.fromisoformat(due_date)
        except ValueError:
            abort(400, description="Invalid date format. Use YYYY-MM-DD.")
    new_task = {
        'taskName': data['taskName'],
        'description': data.get('description'),
        'due_date': due_date,
        'category': data.get('category'),
        'priority': data.get('priority')
    }
    result = tasks_collection.insert_one(new_task)
    new_task['_id'] = str(result.inserted_id)
    return jsonify(new_task), 201

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = list(tasks_collection.find())
    for task in tasks:
        task['_id'] = str(task['_id'])
    return jsonify(tasks)

@app.route('/tasks/<id>', methods=['GET'])
def get_task(id):
    try:
        task = tasks_collection.find_one({'_id': ObjectId(id)})
    except InvalidId:
        abort(400, description="Invalid task ID format.")
    if task is None:
        abort(404)
    task['_id'] = str(task['_id'])
    return jsonify(task)

@app.route('/tasks/<id>', methods=['PUT'])
def update_task(id):
    try:
        ObjectId(id)
    except InvalidId:
        abort(400, description="Invalid task ID format.")
    data = request.get_json()
    due_date = data.get('due_date')
    if due_date:
        try:
            datetime.fromisoformat(due_date)
        except ValueError:
            abort(400, description="Invalid date format. Use YYYY-MM-DD.")
    updated_task = {
        'taskName': data['taskName'],
        'description': data.get('description'),
        'due_date': due_date,
        'category': data.get('category'),
        'priority': data.get('priority')
    }
    result = tasks_collection.update_one({'_id': ObjectId(id)}, {'$set': updated_task})
    if result.matched_count == 0:
        abort(404)
    updated_task['_id'] = id
    return jsonify(updated_task)

@app.route('/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    try:
        ObjectId(id)
    except InvalidId:
        abort(400, description="Invalid task ID format.")
    result = tasks_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 0:
        abort(404)
    return '', 204

@app.route('/tasks/month', methods=['GET'])
def get_tasks_for_month():
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    if not year or not month:
        abort(400, description="Year and month query parameters are required")
    
    filtered_tasks = []
    tasks = tasks_collection.find()
    for task in tasks:
        if task['due_date']:
            try:
                due_date = datetime.fromisoformat(task['due_date'])
                if due_date.year == year and due_date.month == month:
                    task['_id'] = str(task['_id'])
                    filtered_tasks.append(task)
            except ValueError:
                continue
    
    return jsonify(filtered_tasks)

@app.route('/tasks/today', methods=['GET'])
def get_tasks_for_today():
    today = datetime.today().date()
    filtered_tasks = []
    tasks = tasks_collection.find()
    for task in tasks:
        if task['due_date']:
            print("hi")
            try:
                due_date = datetime.fromisoformat(task['due_date']).date()
                if due_date == today:
                    task['_id'] = str(task['_id'])
                    filtered_tasks.append(task)
            except ValueError:
                continue
    
    return jsonify(filtered_tasks)

# Routes for CRUD operations for categories
@app.route('/categories', methods=['POST'])
def create_category():
    data = request.get_json()
    new_category = {
        'name': data['name']
    }
    result = categories_collection.insert_one(new_category)
    new_category['_id'] = str(result.inserted_id)
    return jsonify(new_category), 201

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = list(categories_collection.find())
    for category in categories:
        category['_id'] = str(category['_id'])
    return jsonify(categories)

@app.route('/categories/<id>', methods=['GET'])
def get_category(id):
    try:
        category = categories_collection.find_one({'_id': ObjectId(id)})
    except InvalidId:
        abort(400, description="Invalid category ID format.")
    if category is None:
        abort(404)
    category['_id'] = str(category['_id'])
    return jsonify(category)

@app.route('/categories/<id>', methods=['PUT'])
def update_category(id):
    try:
        ObjectId(id)
    except InvalidId:
        abort(400, description="Invalid category ID format.")
    data = request.get_json()
    updated_category = {
        'name': data['name']
    }
    result = categories_collection.update_one({'_id': ObjectId(id)}, {'$set': updated_category})
    if result.matched_count == 0:
        abort(404)
    updated_category['_id'] = id
    return jsonify(updated_category)

@app.route('/categories/<id>', methods=['DELETE'])
def delete_category(id):
    try:
        ObjectId(id)
    except InvalidId:
        abort(400, description="Invalid category ID format.")
    result = categories_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 0:
        abort(404)
    return '', 204

# Routes for CRUD operations for priorities
@app.route('/priorities', methods=['POST'])
def create_priority():
    data = request.get_json()
    new_priority = {
        'name': data['name']
    }
    result = priorities_collection.insert_one(new_priority)
    new_priority['_id'] = str(result.inserted_id)
    return jsonify(new_priority), 201

@app.route('/priorities', methods=['GET'])
def get_priorities():
    priorities = list(priorities_collection.find())
    for priority in priorities:
        priority['_id'] = str(priority['_id'])
    return jsonify(priorities)

@app.route('/priorities/<id>', methods=['GET'])
def get_priority(id):
    try:
        priority = priorities_collection.find_one({'_id': ObjectId(id)})
    except InvalidId:
        abort(400, description="Invalid priority ID format.")
    if priority is None:
        abort(404)
    priority['_id'] = str(priority['_id'])
    return jsonify(priority)

@app.route('/priorities/<id>', methods=['PUT'])
def update_priority(id):
    try:
        ObjectId(id)
    except InvalidId:
        abort(400, description="Invalid priority ID format.")
    data = request.get_json()
    updated_priority = {
        'name': data['name']
    }
    result = priorities_collection.update_one({'_id': ObjectId(id)}, {'$set': updated_priority})
    if result.matched_count == 0:
        abort(404)
    updated_priority['_id'] = id
    return jsonify(updated_priority)

@app.route('/priorities/<id>', methods=['DELETE'])
def delete_priority(id):
    try:
        ObjectId(id)
    except InvalidId:
        abort(400, description="Invalid priority ID format.")
    result = priorities_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count == 0:
        abort(404)
    return '', 204

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)