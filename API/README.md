# AreAPI
API for AREA, fueled by Node JS and Typescript

### Launch
For compliance, set `AREA_VERSION` environment variable. In order to connect to the postgre db you have to set `DB_HOST`, 
`DB_PORT`, `DB_USER`, `DB_PASSWORD`. 
For Reddit service `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_REDIRECT_URI`.
For Spotify service `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REDIRECT_URI`.

```shell script
> npm install
> npm start
```

### Testing
A `postman collection` is available at the repo's root to test the API with `podman`.
