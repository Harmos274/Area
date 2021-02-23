# Area API Endpoints

AreaAPI is built with REST standard. The API contains three services : Reddit, Twitter and Spotify. Users have to the API with their client in order to use these services.

## Informations

Full information on API services can be obtained with the following endpoint :


### `GET /about.json`

**Request:**
No body or specific header required.

**Response:**
```json
{
    "object": "object"
}
```

---
## Default Behaviour

### Header
Unless it is specified, `Content-Type` header key of requests is **always** `application/json`.


### Failure

On failure, every endpoint will return an object with a corespondant `HTTP/1.1` code:

```json
{
    "data": {
        "source": "<endpoint>",
        "message": "<message>"
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
    "email": "mail",
    "username": "username",
    "password": "password"
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
    "accessToken": "token",
    "accessTokenExpiresAt": "date"
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
    "access_code": "code"
}
```

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
        "name": "name",
        "icon_url": "icon_url",
        "awarder_karma": "awarder_karma",
        "awardee_karma": "awardee_karma",
        "link_karma": "link_karma",
        "comment_karma": "comment_karma"
    },
    "success": true
}
```
Http code: `200 OK`

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
            "author": "author",
            "title": "title",
            "selftext": "selftext",
            "score": "score",
            "ratio": "ratio",
            "image": "image",
            "thumbnail": "thumbnail"
        },
        {
            "...":"..."
        }
    ],
    "success": true
}
```
Http code: `200 OK`

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
            "name": "subreddit name",
            "description": "description",
            "population": "population",
            "icon_url": "icon_url",
            "banner_url": "banner_url"
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