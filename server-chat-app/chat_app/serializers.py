from marshmallow import fields

from chat_app import ma


class UserSchema(ma.Schema):
    id = fields.Integer()
    username = fields.String()


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class MessageSchema(ma.Schema):
    id = fields.Integer()
    content = fields.String()
    user = fields.Nested(UserSchema)
    timestamp = fields.DateTime()


message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)
