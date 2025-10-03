


# Standard library imports
import os

# Remote library imports
from flask import Flask, send_file
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api

# Local imports
from .models import db  # Import db from models

#Important resources
from .resources import(
    UsersResource,UserByIdResource,StudentsResource,CoursesResource,EnrollmentsResource,CourseEnrollmentsResource,StudentEnrollmentsResource,InstructorsResource,InstructorByIdResource,InstructorCoursesResource,SignupResource,LoginResource,LogoutResource
)

# Instantiate app, set attributes
app = Flask(__name__, static_folder='../client/build/static', static_url_path='/static')

from .config import Config
app.config.from_object(Config)
app.json.compact = False

# Initialize db with app
db.init_app(app)

# Create all tables only for local SQLite development
if 'sqlite' in app.config['SQLALCHEMY_DATABASE_URI']:
    with app.app_context():
        db.create_all()

from .models import bcrypt
bcrypt.init_app(app)

migrate = Migrate(app, db)

# Instantiate REST API
api = Api(app, prefix='/api')

# Instantiate CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# with app.app_context():
#     db.create_all()

# add API routes
api.add_resource(SignupResource, '/auth/signup')
api.add_resource(LoginResource, '/auth/login')
api.add_resource(LogoutResource, '/auth/logout')
api.add_resource(UsersResource, '/users')
api.add_resource(UserByIdResource, '/users/<int:user_id>')
api.add_resource(StudentsResource, '/students')
api.add_resource(CoursesResource, '/courses')
api.add_resource(EnrollmentsResource, '/enrollments')
api.add_resource(CourseEnrollmentsResource, '/courses/<int:course_id>/enrollments')
api.add_resource(StudentEnrollmentsResource, '/students/<int:student_id>/enrollments')
api.add_resource(InstructorsResource, '/instructors')
api.add_resource(InstructorByIdResource, '/instructors/<int:instructor_id>')
api.add_resource(InstructorCoursesResource, '/instructors/<int:instructor_id>/courses')

import os
from flask import send_from_directory

@app.route('/manifest.json')
def manifest():
    build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../client/build'))
    return send_from_directory(build_dir, 'manifest.json')

@app.route('/')
def home():
    build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../client/build'))
    index_path = os.path.join(build_dir, 'index.html')
    if not os.path.exists(index_path):
        return "React build not found. Please build the frontend first.", 404
    return send_from_directory(build_dir, 'index.html')

@app.route('/<path:path>')
def serve_react_app(path):
    if path.startswith('api/'):
        return 'API route not found', 404
    build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../client/build'))
    file_path = os.path.join(build_dir, path)
    if not os.path.exists(file_path):
        return send_from_directory(build_dir, 'index.html')
    return send_from_directory(build_dir, path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))
    app.run(host='0.0.0.0', port=port, debug=False)
