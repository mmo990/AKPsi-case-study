from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage for tasks, categories, and priorities
tasks = []
categories = []
priorities = []
task_id_counter = 1
category_id_counter = 1
priority_id_counter = 1

# Routes for CRUD operations for tasks
@app.route('/tasks', methods=['POST'])
def create_task():
    global task_id_counter
    data = request.get_json()
    due_date = data.get('due_date')
    if due_date:
        try:
            datetime.fromisoformat(due_date)
        except ValueError:
            abort(400, description="Invalid date format. Use YYYY-MM-DD.")
    new_task = {
        'id': task_id_counter,
        'taskName': data['taskName'],
        'description': data.get('description'),
        'due_date': due_date,
        'category': data.get('category'),
        'priority': data.get('priority')
    }
    tasks.append(new_task)
    task_id_counter += 1
    return jsonify(new_task), 201

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = next((task for task in tasks if task['id'] == id), None)
    if task is None:
        abort(404)
    return jsonify(task)

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = next((task for task in tasks if task['id'] == id), None)
    if task is None:
        abort(404)
    data = request.get_json()
    due_date = data.get('due_date')
    if due_date:
        try:
            datetime.fromisoformat(due_date)
        except ValueError:
            abort(400, description="Invalid date format. Use YYYY-MM-DD.")
    task['taskName'] = data['taskName']
    task['description'] = data.get('description')
    task['due_date'] = due_date
    task['priority'] = data.get('priority')
    task['category'] = data.get('category')
    return jsonify(task)

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    return '', 204

@app.route('/tasks/month', methods=['GET'])
def get_tasks_for_month():
    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    if not year or not month:
        abort(400, description="Year and month query parameters are required")
    
    filtered_tasks = []
    for task in tasks:
        if task['due_date']:
            try:
                due_date = datetime.fromisoformat(task['due_date'])
                if due_date.year == year and due_date.month == month:
                    filtered_tasks.append(task)
            except ValueError:
                continue
    
    return jsonify(filtered_tasks)

@app.route('/tasks/today', methods=['GET'])
def get_tasks_for_today():
    today = datetime.today().date()
    filtered_tasks = []
    for task in tasks:
        if task['due_date']:
            try:
                due_date = datetime.fromisoformat(task['due_date']).date()
                if due_date == today:
                    filtered_tasks.append(task)
            except ValueError:
                continue
    
    return jsonify(filtered_tasks)

# Routes for CRUD operations for categories
@app.route('/categories', methods=['POST'])
def create_category():
    global category_id_counter
    data = request.get_json()
    new_category = {
        'id': category_id_counter,
        'name': data['name']
    }
    categories.append(new_category)
    category_id_counter += 1
    return jsonify(new_category), 201

@app.route('/categories', methods=['GET'])
def get_categories():
    return jsonify(categories)

@app.route('/categories/<int:id>', methods=['GET'])
def get_category(id):
    category = next((category for category in categories if category['id'] == id), None)
    if category is None:
        abort(404)
    return jsonify(category)

@app.route('/categories/<int:id>', methods=['PUT'])
def update_category(id):
    category = next((category for category in categories if category['id'] == id), None)
    if category is None:
        abort(404)
    data = request.get_json()
    category['name'] = data['name']
    return jsonify(category)

@app.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    global categories
    categories = [category for category in categories if category['id'] != id]
    return '', 204

# Routes for CRUD operations for priorities
@app.route('/priorities', methods=['POST'])
def create_priority():
    global priority_id_counter
    data = request.get_json()
    new_priority = {
        'id': priority_id_counter,
        'name': data['name']
    }
    priorities.append(new_priority)
    priority_id_counter += 1
    return jsonify(new_priority), 201

@app.route('/priorities', methods=['GET'])
def get_priorities():
    return jsonify(priorities)

@app.route('/priorities/<int:id>', methods=['GET'])
def get_priority(id):
    priority = next((priority for priority in priorities if priority['id'] == id), None)
    if priority is None:
        abort(404)
    return jsonify(priority)

@app.route('/priorities/<int:id>', methods=['PUT'])
def update_priority(id):
    priority = next((priority for priority in priorities if priority['id'] == id), None)
    if priority is None:
        abort(404)
    data = request.get_json()
    priority['name'] = data['name']
    return jsonify(priority)

@app.route('/priorities/<int:id>', methods=['DELETE'])
def delete_priority(id):
    global priorities
    priorities = [priority for priority in priorities if priority['id'] != id]
    return '', 204

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)