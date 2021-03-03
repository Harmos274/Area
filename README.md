# Area API Endpoints

AreaAPI is built with REST standard. The API contains three services : Reddit, Twitter and Spotify. Users have to the API with their client in order to use these services.

## Informations

Full information on API services can be obtained with the following endpoint :


### `GET /about.json`

Return informations about the API. If no or invalid `token` is provided the only activated services will be `register` and `token`.

**Request:**

optional header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**
```json
{
    "object": "object"
}
```
Http code: `200 OK`

---
## Default Behaviour

### Header
Unless it is specified, `Content-Type` header key of requests is **always** `application/json`.


### Failure

On failure, every endpoint will return an object with a corespondant `HTTP/1.1` code:

```json
{
    "data": {
        "source": "string",
        "message": "string"
    },
    "success": false
}
```

---
## Authentication

Authentication endpoints use the [OAuth2](https://oauth.net/2/) standard.


### `POST /oauth/register`

Create an Area account.

**Request:**

body:
```json
{
    "email": "string",
    "username": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "success": true
}
```
Http code: `201 Created`

<br>


### `POST /oauth/token`

Login to an existing Area account. It will return an authentication token.

**Request:**

headers:

| Key           | Value                                    |
|---------------|------------------------------------------|
| Authorization | Basic `client_id:client_secret base64'd` |
| Content-Type  | application/x-www-form-urlencoded        |

body:
```
grant_type=password&username=username&password=password
```
**Response:**
```json
{
    "data": {
        "access_token": "string",
        "access_token_expires_at": "date_string"
    },
    "success": true
}
```
Http code: `201 Created`


---
## Reddit
Area can be connected with your Reddit account in order to give you insights on your favorite comunities.

### `PUT /reddit/link`

Link Reddit account to an existing Area account in order to use the widgets.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

body:
```json
{
    "access_code": "string"
}
```
**Response:**
```json
{
    "success": true
}
```
Http code: `201 Created`

<br>

### `PUT /reddit/unlink`

Link Reddit account to an existing Area account in order to use the widgets.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**
```json
{
    "success": true
}
```
Http code: `200 OK`

<br>

### `PUT /reddit/status`

Link Reddit account to an existing Area account in order to use the widgets.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**
```json
{
    "data": {
        "logged_in": "boolean",
    },
    "success": true
}
```
Http code: `200 OK`

<br>


### `GET /reddit/profile`

Get Reddit profile info.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**
```json
{
    "data": {
        "name": "string",
        "icon_url": "string",
        "awarder_karma": "number",
        "awardee_karma": "number",
        "link_karma": "number",
        "comment_karma": "number"
    },
    "success": true
}
```
Http code: `200 OK`

<br>

### `GET /reddit/hots?sub=Y&nbr=X`

Get last `X` posts from subreddit `Y`.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**
```json
{
    "data": 
    [
        {
            "author": "string",
            "title": "string",
            "selftext": "string",
            "score": "number",
            "ratio": "number",
            "image": "string",
            "thumbnail": "string",
            "pinned": "boolean"
        },
        {
            "...":"..."
        }
    ],
    "success": true
}
```
Http code: `200 OK`

<br>

### `GET /reddit/spotlights`

Get actual Reddit spotlights.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**
```json
{
    "data": 
    [
        {
            "name": "string",
            "description": "string",
            "population": "number",
            "icon_url": "string",
            "banner_url": "string"
        },
        {
            "...":"..."
        }
    ],
    "success": true
}
```
Http code: `200 OK`

---
## Spotify

### `PUT /spotify/link`

Link Spotify to an existing Area account in order to use the widgets.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

body:
```json
{
    "token": "<token>"
}
```

<br>

### `GET /spotify/trendings`

Get Spotify trending.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

### `GET /spotify/podcast?name=Y`

### `GET /spotify/playlist?name=Y`

### `GET /spotify/song?name=Y`

### `GET /spotify/artist?name=Y`

---
## Widget

### `GET /widget/list`

Show the enabled widgets of the user. On response type, every fields in `config` field are optional.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**

```json
{
    "data": 
    [
        {
            "id": "number",
            "type": {
                "name": "string",
                "configurable": "boolean"
            },
            "config": {
                "name": "string?",
                "number": "number?",
                "refresh": "number?"
            }
        },
        {
            "...": "..."    
        }
    ],
    "success": true
}
```
Http code: `200 OK`

<br>

### `POST /widget`

Save a widget to a user account. Every fields in `config` field are optional.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

body:
```json
{
    "data": 
    {
        "type_name": "string",
        "config": {
            "name": "string?",
            "number": "number?",
            "refresh": "number?"
        }
    },
    "success": true
}
```

**Response:**
```json
{
    "data": {
        "widget_id": "number"
    },
    "success": true
}
```
Http code: `201 Created`

<br>

### `PATCH /widget/:widget_id`

Update a widget's configuration already saved to a user account.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |

**Response:**
```json
{
    "success": true
}
```
Http code: `200 OK`

<br>

### `DELETE /widget/:widget_id`

Delete a widget from a user account.

**Request:**

header:
| Key           | Value          |
|---------------|----------------|
| Authorization | Bearer `token` |


**Response:**
```json
{
    "success": true
}
```
Http code: `200 OK`