use actix_web::{dev::HttpServiceFactory, get, post, web};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use serde::{Deserialize, Serialize};

use crate::{
    data::{AppData, LinkData, User},
    responses::{self, Response, ServiceStatus},
};

pub fn service() -> impl HttpServiceFactory {
    web::scope("/spotify")
        .service(link)
        .service(unlink)
        .service(status)
        .service(profile)
        .service(player_src)
        .service(showplayer_src)
}

fn check_link<F, R>(user: &User, f: F) -> Response<R>
where
    F: FnOnce(&User) -> Response<R>,
    R: Serialize,
{
    if let Some(_) = user.spotify {
        f(user)
    } else {
        Response::forbidden(format!(
            "User {} have not linked their Spotify account.",
            user.username
        ))
    }
}

#[post("/link")]
async fn link(
    data: web::Data<AppData>,
    auth: BearerAuth,
    request: web::Json<LinkData>,
) -> Response<()> {
    let LinkData { code } = request.0;

    data.map_to_user_mut(auth.token(), |user| {
        user.spotify = Some(code);

        Response::ok(())
    })
}

#[post("/unlink")]
async fn unlink(data: web::Data<AppData>, auth: BearerAuth) -> Response<()> {
    data.map_to_user_mut(auth.token(), |user| {
        user.spotify = None;

        Response::ok(())
    })
}

#[get("/status")]
async fn status(data: web::Data<AppData>, auth: BearerAuth) -> Response<ServiceStatus> {
    data.map_to_user(auth.token(), |user| {
        responses::status(user.spotify.is_some())
    })
}

#[get("/profile")]
async fn profile(data: web::Data<AppData>, auth: BearerAuth) -> Response<ProfileResponse> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| {
            Response::ok(ProfileResponse {
                name: "Hiccup".to_string(),
                country: "IS".to_string(),
                followers: 135,
                icon_url: "https://tissuspicious.files.wordpress.com/2013/09/toothless.png"
                    .to_string(),
                is_premium: true,
            })
        })
    })
}

#[derive(Serialize)]
struct ProfileResponse {
    name: String,
    country: String,
    followers: usize,
    icon_url: String,
    is_premium: bool,
}

#[get("/music")]
async fn player_src(
    data: web::Data<AppData>,
    auth: BearerAuth,
    args: web::Query<SrcArgs>,
) -> Response<UrlResponse> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| match parse_uri(&args.uri) {
            Some(uri) if uri.is_music() => Response::ok(UrlResponse { url: uri.to_url() }),
            _ => Response::bad_request("Invalid uri".to_string()),
        })
    })
}

#[get("/podcast")]
async fn showplayer_src(
    data: web::Data<AppData>,
    auth: BearerAuth,
    args: web::Query<SrcArgs>,
) -> Response<UrlResponse> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| match parse_uri(&args.uri) {
            Some(uri) if uri.is_show() => Response::ok(UrlResponse { url: uri.to_url() }),
            _ => Response::bad_request("Invalid uri".to_string()),
        })
    })
}

fn parse_uri(uri: &str) -> Option<SpotifyUri> {
    let mut iter = uri.split(':');
    let source = iter.next()?;
    let resource_type = iter.next()?;
    let id = iter.next()?;

    if source == "spotify" {
        Some(SpotifyUri {
            resource_type: resource_type.to_string(),
            id: id.to_string(),
        })
    } else {
        None
    }
}

#[derive(Serialize)]
struct UrlResponse {
    url: String,
}

struct SpotifyUri {
    resource_type: String,
    id: String,
}

impl SpotifyUri {
    fn to_url(&self) -> String {
        format!(
            "https://open.spotify.com/embed/{}/{}",
            self.resource_type, self.id
        )
    }

    fn is_music(&self) -> bool {
        match self.resource_type.as_str() {
            "album" | "track" | "artist" | "playlist" => true,
            _ => false,
        }
    }

    fn is_show(&self) -> bool {
        self.resource_type == "show"
    }
}

#[derive(Deserialize)]
struct SrcArgs {
    uri: String,
}
