# Pintereach API

https://pintereach1.herokuapp.com

#### Endpoints

| Method | Endpoint      | Description                                                                                                          |
| :----- | :------------ | :------------------------------------------------------------------------------------------------------------------ |
| POST   | /api/register | Creates user and returns token.
| POST   | /api/login    | Authenticates user and returns token.                             |
| GET    | /api/articles | Returns list of user's articles.                                                                                     |

## POST /api/register

```https://pintereach1.herokuapp.com/api/register```

### Create user and return token

* **username** _(required)_ - must be unique
* **password** _(required)_
* **email** _(required)_ - must be unique

**Body**
```js
{
    "username": "moo",
    "password": "cat",
    "email": "moo@cat.com"
}
```

## POST /api/login

```https://pintereach1.herokuapp.com/api/login```

### Authenticate user and return token

* **username** _(required)_
* **password** _(required)_

**Body**
```js
{
    "username": "moo",
    "password": "cat",
}
```

## GET /api/validate

```https://pintereach1.herokuapp.com/api/validate```

### Verify current user's token

* token in **Authorization** request header _(required)_

**Example Response: 200 OK**
```js
{
    "validToken": true,
    "message": "Valid token."
}
```

## GET /api/articles

### Return list of user's articles
