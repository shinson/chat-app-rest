from flask import Flask, jsonify, request
from flask_restful import Resource

from chat_app import api, db
from chat_app.model import User, Message
from chat_app.serializers import user_schema, users_schema, message_schema, messages_schema


class UserList(Resource):

    @staticmethod
    def get():
        users = db.session.query(User).all()
        result = users_schema.dump(users)
        return jsonify(result.data)

    @staticmethod
    def post():
        username = request.json['username']

        user = db.session.query(User).filter(User.username == username).one_or_none()

        if not user:
            user = User(username=username)
            db.session.add(user)
            db.session.commit()

        return user_schema.jsonify(user)


class MessageList(Resource):

    @staticmethod
    def get():
        messages = db.session.query(Message).order_by(Message.timestamp)
        result = messages_schema.dump(messages)
        return jsonify(result.data)

    @staticmethod
    def post():
        user_id = request.json['userId']
        content = request.json['content']

        message = Message(user_id=user_id, content=content)
        db.session.add(message)
        db.session.commit()

        return message_schema.jsonify(message)


api.add_resource(UserList, '/users')
api.add_resource(MessageList, '/messages')


