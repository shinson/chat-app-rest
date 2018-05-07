from flask import Flask, jsonify, request
from flask_restful import Resource

from chat_app import api, db
from chat_app.model import User, Message
from chat_app.serializers import user_schema, users_schema, message_schema, messages_schema


class UserList(Resource):
    def get(self):
        users = db.session.query(User).all()
        result = users_schema.dump(users)
        return jsonify(result.data)

    def post(self):
        username = request.json['username']
        user = User(username=username)
        db.session.add(user)
        db.session.commit()
        return user_schema.jsonify(user)


class MessageList(Resource):
    def get(self):
        messsages = db.session.query(Message).all()
        result = messages_schema.dump(messsages)
        return jsonify(result.data)

    def post(self):
        user = request.json['user']
        content = request.json['content']
        message = Message(user_id=user['id'], content=content)
        db.session.add(message)
        db.session.commit()
        return message_schema.jsonify(message)


api.add_resource(UserList, '/users')
api.add_resource(MessageList, '/messages')


