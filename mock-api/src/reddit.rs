use actix_web::{dev::HttpServiceFactory, get, post, web};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use serde::{Deserialize, Serialize};

use crate::{
    data::{AppData, LinkData, User},
    responses::{self, Response, ServiceStatus},
};

pub fn service() -> impl HttpServiceFactory {
    web::scope("/reddit")
        .service(link)
        .service(unlink)
        .service(status)
        .service(profile)
        .service(hots)
        .service(spotlights)
}

fn check_link<F, R>(user: &User, f: F) -> Response<R>
where
    F: FnOnce(&User) -> Response<R>,
    R: Serialize,
{
    if let Some(_) = user.reddit {
        f(user)
    } else {
        Response::forbidden(format!(
            "User {} have not linked their Reddit account.",
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
        user.reddit = Some(code);

        Response::ok(())
    })
}

#[post("/unlink")]
async fn unlink(data: web::Data<AppData>, auth: BearerAuth) -> Response<()> {
    data.map_to_user_mut(auth.token(), |user| {
        user.reddit = None;

        Response::ok(()).into()
    })
}

#[get("/status")]
async fn status(data: web::Data<AppData>, auth: BearerAuth) -> Response<ServiceStatus> {
    data.map_to_user(auth.token(), |user| {
        responses::status(user.reddit.is_some())
    })
}

#[get("/profile")]
async fn profile(data: web::Data<AppData>, auth: BearerAuth) -> Response<ProfileResponse> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| Response::ok(profile_response()))
    })
}

fn profile_response() -> ProfileResponse {
    ProfileResponse {
        name: "Toothless".to_string(),
        icon_url: "https://tissuspicious.files.wordpress.com/2013/09/toothless.png".to_string(),
        awardee_karma: 24312,
        awarder_karma: 3219,
        link_karma: 32091,
        comment_karma: 32421,
    }
}

#[derive(Serialize)]
struct ProfileResponse {
    name: String,
    icon_url: String,
    awarder_karma: u64,
    awardee_karma: u64,
    link_karma: u64,
    comment_karma: u64,
}

#[get("/hots")]
async fn hots(
    data: web::Data<AppData>,
    auth: BearerAuth,
    params: web::Query<HotsParameters>,
) -> Response<Vec<HotPost>> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| Response::ok(hots_response(params.nbr)))
    })
}

#[allow(dead_code)]
#[derive(Deserialize)]
struct HotsParameters {
    sub: String,
    nbr: usize,
}

fn hots_response(nbr: usize) -> Vec<HotPost> {
    let mut pos = 0;

    std::iter::from_fn(move || {
        let nbr = pos;
        pos += 1;

        Some(HotPost {
            author: format!("author_{}", nbr),
            title: format!("Post {}", nbr),
            selftext: format!("Post {} selftext", nbr),
            score: 42000,
            ratio: 0.8,
            image: "https://i.redd.it/rq36kl1xjxr01.png".to_string(),
            thumbnail: "https://www.reddit.com/favicon.ico".to_string(),
            pinned: false,
            url: "https://www.reddit.com/r/MonaLeslie/comments/bj3bxp/_/".to_string(),
        })
    })
    .take(nbr)
    .collect()
}

#[derive(Serialize)]
struct HotPost {
    author: String,
    title: String,
    selftext: String,
    score: i64,
    ratio: f64,
    image: String,
    thumbnail: String,
    pinned: bool,
    url: String,
}

#[get("/spotlights")]
async fn spotlights(data: web::Data<AppData>, auth: BearerAuth) -> Response<Vec<Spotlight>> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| Response::ok(spotlights_response()))
    })
}

fn spotlights_response() -> Vec<Spotlight> {
    const ICON_URL: &str =
        "https://styles.redditmedia.com/t5_2r0ij/styles/communityIcon_yor9myhxz5x11.png";
    const BANNER_URL: &str =
        "https://styles.redditmedia.com/t5_2r0ij/styles/bannerBackgroundImage_6gx1wewyz5x11.jpg";

    let mut pos = 0;

    std::iter::from_fn(move || {
        let nbr = pos;
        pos += 1;

        Some(Spotlight {
            name: format!("subreddit_{}", nbr),
            description: format!(
                "Subreddit {} is just another randomly generated subreddit",
                nbr
            ),
            population: 1_934_252,
            icon_url: ICON_URL.to_string(),
            banner_url: BANNER_URL.to_string(),
            url: "r/Pizza".to_string(),
        })
    })
    .take(10)
    .collect()
}

#[derive(Serialize)]
struct Spotlight {
    name: String,
    description: String,
    population: u64,
    icon_url: String,
    banner_url: String,
    url: String,
}
