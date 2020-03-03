# Pintereach API

http://pintereach1.herokuapp.com

### Endpoints

| Method | Endpoint      | Description                                                                                                          |
| :----- | :------------ | :------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/register | Creates user and returns token. **username** _required/unique_, **password** _required_, **email** _required/unique_ |
| POST   | /api/login    | Authenticates user and returns token. **username** _required_, **password** _required_                               |
| GET    | /api/articles | Returns list of user's articles.                                                                                     |
