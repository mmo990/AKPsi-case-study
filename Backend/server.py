from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for tasks (you can replace this with a real database later)
tasks = []

# Endpoint to add a new task
@app.route('/add-task', methods=['POST'])
def add_task():
    # Get task data from POST request body (JSON)
    task_data = request.json
    task_name = task_data.get('name', '')  # Get the task name from the request
    task_date = task_data.get('date', '')  # Get the task date from the request
    
    # Validate the task data
    if not task_name or not task_date:
        return jsonify({'message': 'Task name and date are required'}), 400
    
    # Store the task in the in-memory list
    task = {
        'name': task_name,
        'date': task_date
    }
    tasks.append(task)  # Append task to the list
    
    # Respond with a success message and the added task
    response = {
        'message': 'Task added successfully',
        'task': task
    }
    
    return jsonify(response), 200  # Return the response with HTTP status 200

# Endpoint to get all tasks
@app.route('/get-tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks}), 200  # Return all tasks in JSON format

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)
