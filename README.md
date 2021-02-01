# Area API Endpoints

AreaAPI is built with REST standard. The API contains three services : Reddit, Twitter and Spotify. Users have to the API with their client in order to use these services. 

## Connection

### `POST /register`

Create an Area account.

body:
```json
{
	email: "mail",
	username: "username",
	password: "password"
}
```

### `POST /login`

Login to an existing Area account. It will return an authentication token.

body:
```json
{
	email: "mail",
	password: "password"
}
```

### `GET /about.json`

Get some informations about the API.

## Reddit

### `POST /reddit/link`

Link Reddit account to an existing Area account in order to use the widgets.

### `GET /reddit/profil`

Get Reddit profile infos.

### `GET /reddit/posts`

Get lasts Reddit posts from a subreddit.

### `GET /reddit/spotlights`

Get actual Reddit spotligths.

## Twitter

### `POST /twitter/link`

Link Twitter account to an existing Area account in order to use the widgets.

### `POST /twitter/tweet`

Send a tweet.

### `GET /twitter/tweets?user="Y"&nbr="X"`

Get the ids of the `X` lasts tweets from `Y`.

### `GET /twitter/tweet/:id`
Get tweet infos.

### `GET /twitter/notifications`

### `GET /twitter/trending`

## Spotify

### `POST /spotify/link`

Link Spotify to an existing Area account in order to use the widgets.

### `GET /spotify/trendings`

Get Spotify trendings.

### `GET /spotify/podcast?name=Y`

### `GET /spotify/playlist?name=Y`

### `GET /spotify/song?name=Y`

### `GET /spotify/artist?name=Y`
