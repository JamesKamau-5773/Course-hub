import os

class Config:
    if os.environ.get('DATABASE_URL'):
        uri = os.environ.get('DATABASE_URL').replace("postgres://", "postgresql://")
    else:
        uri = 'sqlite:///app.db'
    SQLALCHEMY_DATABASE_URI = uri
    SQLALCHEMY_TRACK_MODIFICATIONS = False