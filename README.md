# Pintereach API

https://pintereach1.herokuapp.com

### Endpoints

| Method | Endpoint                     | Description                         |
| :----- | :--------------------------- | :---------------------------------- |
| POST   | /api/register                | Create user and return token        |
| POST   | /api/login                   | Authenticate user and return token  |
| GET    | /api/validate                | Verify token                        |
| GET    | /api/articles                | Retrieve saved articles             |
| GET    | /api/articles/:id            | Retrieve article by id              |
| POST   | /api/articles/                | Save article                        |
| PUT    | /api/articles/:id                | Edit saved article                  |
| DELETE | /api/articles/:id                | Remove saved article                |
| GET    | /api/categories              | Retrieve categories                 |
| POST   | /api/categories              | Add category                        |
| GET    | /api/categories/:id/articles | Retrieve articles within a category |
| POST   | /api/categories/:id/articles | Assign article to a category        |
| DELETE | /api/categories/:id/articles | Remove article from a category      |
| GET    | /api/boards/:id              | Retrieve board by id                |
| POST   | /api/boards                  | Add board                           |

### All routes

- users only have access to their own resources
- token in **Authorization** request header _(required)_ - except `/api/register`, `/api/login`, and `/api/validate`

### Questions

**How do I post an article to a board?**

Use the PUT /api/articles/:id endpoint to change an article's `board_id` property, which refers to the id of a given board. An article can only be posted to one board, but it may be assigned to more than one category.

## POST /api/register

`https://pintereach1.herokuapp.com/api/register`

### Create user and return token

- **username** _(required)_ - must be unique
- **password** _(required)_
- **email** _(required)_ - must be unique

**Body**

```js
{
    "username": "moo",
    "password": "cat",
    "email": "moo@cat.com"
}
```

## POST /api/login

`https://pintereach1.herokuapp.com/api/login`

### Authenticate user and return token

- **username** _(required)_
- **password** _(required)_

**Body**

```js
{
    "username": "moo",
    "password": "cat"
}
```

## GET /api/validate

`https://pintereach1.herokuapp.com/api/validate`

### Verify token

**Example Response**

```js
{
    "validToken": true,
    "message": "Valid token."
}
```

## GET /api/articles

`https://pintereach1.herokuapp.com/api/articles`

### Retrieve saved articles

**Example Response**

```js
```

## GET /api/articles/:id

`https://pintereach1.herokuapp.com/api/articles/:id`

### Retrieve article by id

**Example Response**

```js
```

## POST /api/articles/:id

`https://pintereach1.herokuapp.com/api/articles/:id`

### Save article

- **url** _(required)_
- **title**, **image** _(image url)_, **description** - if unspecified in request body, Pintereach will attempt to populate these fields with values from [LinkPreview API](https://www.linkpreview.net)
- **notes**
- **board_id**
- Returns saved articles

**Example Response**

```js
```

## PUT /api/articles/:id

`https://pintereach1.herokuapp.com/api/articles/:id`

### Edit saved article

- Returns updated article

**Body**

```js
```

```js
```

## DELETE /api/articles

`https://pintereach1.herokuapp.com/api/articles/:id`

### Remove saved article

- Returns saved articles

## GET /api/categories

`https://pintereach1.herokuapp.com/api/categories`

### Retrieve categories

**Example Response**

```js
```

## POST /api/categories

`https://pintereach1.herokuapp.com/api/categories`

### Add category

- **name** _(required)_
- Returns created category

**Body**

```js
{
    "name": "JavaScript"
}
```

## GET /api/categories/:id/articles

`https://pintereach1.herokuapp.com/api/categories/:id/articles`

### Retrieve articles within a category

- category **id** in route parameters _(required)_

**Example Response**

```js
```

## POST /api/categories/:id/articles

`https://pintereach1.herokuapp.com/api/categories/:id/articles`

### Assign article to a category

- category **id** in route parameters _(required)_
- Returns articles within the given category

**Body**

```js
{
   "article_id": "1"
}
```

## DELETE /api/categories/:id/articles

`https://pintereach1.herokuapp.com/api/categories/:id/articles/{?artid}`

### Remove article from a category

- category **id** in route parameters _(required)_
- article **id** as `artid` in query parameters _(required)_
- Returns articles within the given category

**Example Query String**

```js
https://pintereach1.herokuapp.com/api/categories/1/articles?artid=1
```

## GET /api/boards/:id

`https://pintereach1.herokuapp.com/api/boards/:id`

### Retrieve board by id

**Example Response**

```js
```

## POST /api/boards

`https://pintereach1.herokuapp.com/api/boards`

### Add board

- **name** _(required)_
- **description**
- **private** _(`boolean`, default to `false`)_ - for features in a future release: ability to view other users' boards, make boards private
- Returns created board

**Example Response**

```js
{
    "id": 1,
    "name": "Full Stack Web",
    "description": "Learning front end and back end.",
    "private": false,
    "user_id": 1
}
```