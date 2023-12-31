import unittest
import json
from main import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        self.base_url = 'http://127.0.0.1:5000'


    def get_full_url(self, endpoint):
        return f'{self.base_url}{endpoint}'


    # Must replace test email each time you run the test
    def test_register_user(self):
        data = {'email': 'mctest@example.com', 'password': 'password'}
        response = self.app.post(self.get_full_url('/register'), json=data)

        self.assertEqual(response.status_code, 201)
        self.assertIn('token', response.get_json())
        self.assertIn('User registered successfully', response.get_json()['message'])


    def test_login_success(self):
        data = {'email': 'testemail@test.com', 'password': 'test'}
        response = self.app.post(self.get_full_url('/login'), json=data)

        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.get_json())
        self.assertIn('Login successful', response.get_json()['message'])


    def test_login_failure(self):
        data = {'email': 'nonexistent@example.com', 'password': 'wrongpassword'}
        response = self.app.post(self.get_full_url('/login'), json=data)

        self.assertEqual(response.status_code, 401)
        self.assertIn('Invalid username or password', response.get_json()['message'])



if __name__ == '__main__':
    unittest.main()
