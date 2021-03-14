# AreAPI
API for AREA, fueled by Node JS and Typescript

### Launch
For compliance, set `AREA_VERSION` environment variable. In order to connect to the postgre db you have to set `DB_HOST`, 
`DB_PORT`, `DB_USER`, `DB_PASSWORD`. 

For Reddit service `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_REDIRECT_URI` the Reddit app need 
the scopes `identity` and `read`.

For Spotify service `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REDIRECT_URI` the Spotify app need
the scopes `user-read-email` and `user-read-private`.

For GitHub service `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_REDIRECT_URI` `GITHUB_STATE` and the GitHub app need
the scopes `read:user` and `repo`.


```shell script
> npm install
> npm start
```

### Testing
A `postman collection` is available at the repo's root to test the API with `podman`.
