# Pintereach API

**Endpoints**

https://pintereach1.herokuapp.com

| Method | Endpoint      | Description                                                                                                          |
| :----- | :------------ | :------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/register | Creates user and returns token.  |
| POST   | /api/login    | Authenticates user and returns token. **username** _required_, **password** _required_                               |
| GET    | /api/articles | Returns list of user's articles.                                                                                     |
| GET    | /api/articles/:id | Returns article by id.     
| GET    | /api/articles/:id | Returns article by id.     

## POST /api/register

```https://pintereach1.herokuapp.com/api/register```

**username** _required/unique_, **password** _required_, **email** _required/unique_