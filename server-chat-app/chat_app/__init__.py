from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_restful import Api
from flask_marshmallow import Marshmallow
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)
ma = Marshmallow(app)
CORS(app)


from chat_app import routes, model
