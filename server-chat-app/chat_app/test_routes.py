import unittest
from chat_app import app
from flask import json, jsonify


class TestRoutes(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_user_get_status(self):
        response = self.app.get('/users')
        assert response.status_code == 200

    def test_messages_get_status(self):
        response = self.app.get('/messages')
        assert response.status_code == 200


if __name__ == '__main__':
    unittest.main()