from typing import no_type_check
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import psycopg2


app = Flask(__name__)
cors = CORS(app)


# Update the PostgreSQL connection string with your actual credentials
conn = psycopg2.connect(
    dbname='mytest',
    user='sammorton',
    password='scheer62',
    host='localhost',
    port='5432'
)

cursor = conn.cursor()
print("Connected to the database!")

app.config['SECRET_KEY'] = 'fjdla;skjdfdkl;asskdjf;asl'
jwt = JWTManager(app)

# Blacklist to store revoked tokens
blacklist = set()


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        print(email, password)

        if email and password:
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

            cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s);", (email, hashed_password))
            conn.commit()

            token = create_access_token(identity=email)

            return jsonify({'token': token, 'message': 'User registered successfully'}), 201

    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong'}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    cursor.execute("SELECT * FROM users WHERE email = %s;", (email,))
    user = cursor.fetchone()

    if user and check_password_hash(user[2], password):
        token = create_access_token(identity=email, expires_delta=False)
        return jsonify({'token': token, 'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        jti = get_jwt()['jti']
        blacklist.add(jti)
        return jsonify({'message': 'Logout successful'}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong'}), 500


@app.route('/todo', methods=['DELETE'])
@jwt_required()
def delete_all_completed():
    try:
        user = get_jwt_identity()
        cursor.execute("SELECT * FROM users WHERE email = %s;", (user,))
        current_user = cursor.fetchone()

        if current_user:
            user_id = current_user[0]
            completed = True

            cursor.execute("DELETE FROM user_todos WHERE completed = %s AND user_id = %s", (completed, user_id))

            conn.commit()

            return jsonify({'message': 'All completed todos deleted successfully'})

    except Exception as e:
        print(e)
        return jsonify({'message': 'User not found'}), 404


@app.route('/todo/<todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo_by_id(todo_id):
    try:
        user = get_jwt_identity()
        cursor.execute("SELECT * FROM users WHERE email = %s;", (user,))
        current_user = cursor.fetchone()

        if current_user:
            user_id = current_user[0]
            cursor.execute("DELETE FROM user_todos WHERE id = %s AND user_id = %s;", (todo_id, user_id))
            conn.commit()

            return jsonify({'message': 'Todo deleted successfully'}), 200

        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'message': 'User not found'}), 404


@app.route('/todo/<todo_id>', methods=['GET'])
@jwt_required()
def get_todo_by_id(todo_id):
    try:
        user = get_jwt_identity()

        cursor.execute("SELECT * FROM users WHERE email = %s;", (user,))

        # grab that user's id
        current_user = cursor.fetchone()

        if current_user:
            user_id = current_user[0]

            cursor.execute("SELECT * FROM user_todos WHERE id = %s AND user_id = %s;", (todo_id, user_id))
            todo = cursor.fetchone()

            if todo:
                todo = {
                    'id': todo[0],
                    'user_id': todo[1],
                    'task': todo[2],
                    'completed': todo[3],
                    'description': todo[4],
                    'created_at': todo[5],
                    'updated_at': todo[6],
                }
                return jsonify(todo), 200
            else:
                return jsonify({'message': 'Todo not found'}), 404
    except Exception as e:
        return jsonify({'message': 'User not found'}), 404


@app.route('/todos', methods=['GET'])
@jwt_required()
def get_todos():
    try:
        user = get_jwt_identity()

        # grab that users id
        cursor.execute("SELECT * FROM users WHERE email = %s;", (user,))
        current_user = cursor.fetchone()
        id = current_user[0]

        cursor.execute("SELECT * FROM user_todos WHERE user_id = %s;", (id,))
        current_todos = cursor.fetchall()

        user_todos = [
            {
                'id': todo[0],
                'user_id': todo[1],
                'task': todo[2],
                'completed': todo[3],
                'description': todo[4],
                'created_at': todo[5],
                'updated_at': todo[6],
            } for todo in current_todos
        ]

        return jsonify(user_todos), 200

    except Exception as e:
        return jsonify({"message": "Error getting todos"}), 400




@app.route('/select_all_todos', methods=['PUT'])
@jwt_required()
def update_all_todos():
    try:
        user = get_jwt_identity()
        cursor.execute("SELECT * FROM users WHERE email = %s", (user,))
        current_user = cursor.fetchone()

        if current_user:
            completed = True

            # Retrieve user_id for the current user
            user_id = current_user[0]

            if completed is not None:
                # Update all todos for the user with the provided completion status
                update_query = "UPDATE user_todos SET completed = %s WHERE user_id = %s;"
                cursor.execute(update_query, (completed, user_id))
                conn.commit()

                return jsonify({'message': 'All todos updated successfully'}), 200
            else:
                return jsonify({'message': 'Missing "completed" field in the request data'}), 400
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong'}), 500


@app.route('/todos', methods=['PUT'])
@jwt_required()
def update_todo():
    try:
        user = get_jwt_identity()

        cursor.execute("SELECT * FROM users WHERE email = %s;", (user,))

        # grab that user's id
        current_user = cursor.fetchone()

        if current_user:
            # Parse todo data from the request as json
            todo_data = request.get_json()

            # Extract todo data from the request
            task = todo_data.get('task')
            description = todo_data.get('description')
            completed = todo_data.get('completed')
            todo_id = todo_data.get('id')

            # Task exists, update it
            update_query = "UPDATE user_todos SET task = %s, description = %s, completed = %s WHERE id = %s;"
            cursor.execute(update_query, (task, description, completed, todo_id))

            conn.commit()

            return jsonify({'message': 'Todo updated successfully'}), 201
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': f'Something went wrong - ${e}'}), 500



@app.route('/todos', methods=['POST'])
@jwt_required()
def add_todo():
    try:
        user = get_jwt_identity()

        cursor.execute("SELECT * FROM users WHERE email = %s;", (user,))

        # grab that user's id
        current_user = cursor.fetchone()

        if current_user:
            user_id = current_user[0]

            # Extract todo data from the request
            todo_data = request.get_json()
            task = todo_data.get('task')  # Assuming the JSON contains a 'text' field
            description = todo_data.get('description')
            completed = todo_data.get('completed')

            # Insert the new todo for the user
            cursor.execute("INSERT INTO user_todos (user_id, task, completed, description) VALUES (%s, %s, %s, %s);", (user_id, task, completed, description))

            conn.commit()

            return jsonify({'message': 'Todo added successfully'}), 201
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'message': f'Something went wrong - ${e}'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
