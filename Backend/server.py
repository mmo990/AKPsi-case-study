from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage for tasks
tasks = []
task_id_counter = 1

# Routes for CRUD operations
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

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)