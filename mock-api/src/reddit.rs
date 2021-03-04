use actix_web::{dev::HttpServiceFactory, get, post, web};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use serde::{Deserialize, Serialize};

// Return Either<Response<T>, Response<String>>

use crate::{
    data::{AppData, LinkData},
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
    data.map_to_user(auth.token(), |_| profile_response())
}

fn profile_response() -> Response<ProfileResponse> {
    Response::ok(ProfileResponse {
        name: "Toothless".to_string(),
        icon_url: "https://tissuspicious.files.wordpress.com/2013/09/toothless.png".to_string(),
        awardee_karma: 24312,
        awarder_karma: 3219,
        link_karma: 32091,
        comment_karma: 32421,
    })
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
    params: web::Path<HotsParameters>,
) -> Response<Vec<HotPost>> {
    data.map_to_user(auth.token(), |_| Response::ok(hots_response(params.nbr)))
}

#[allow(dead_code)]
#[derive(Deserialize)]
struct HotsParameters {
    sub: String,
    nbr: u64,
}

fn hots_response(nbr: u64) -> Vec<HotPost> {
    let pos = 0;

    std::iter::from_fn(move || {
        if pos < nbr {
            Some(HotPost {
                author: format!("author_{}", nbr),
                title: format!("Post {}", nbr),
                selftext: format!("Post {} selftext", nbr),
                score: 42000,
                ratio: 0.8,
                image: "".to_string(),
                thumbnail: "".to_string(),
                pinned: false,
            })
        } else {
            None
        }
    })
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
}

#[get("/spotlights")]
async fn spotlights(data: web::Data<AppData>, auth: BearerAuth) -> Response<Vec<Spotlight>> {
    data.map_to_user(auth.token(), |_| Response::ok(spotlights_response()))
}

fn spotlights_response() -> Vec<Spotlight> {
    vec![Spotlight {
        name: "Hardware".to_string(),
        description: "No, there is no stock anywhere.".to_string(),
        population: 1_934_252,
        icon_url: "https://styles.redditmedia.com/t5_2qh18/styles/communityIcon_2509b5q1k8z41.png"
            .to_string(),
        banner_url: "https://cdn.videocardz.com/1/2020/09/NVIDIA-GeForce-RTX-3080-out-of-stock.jpg"
            .to_string(),
    }]
}

#[derive(Serialize)]
struct Spotlight {
    name: String,
    description: String,
    population: u64,
    icon_url: String,
    banner_url: String,
}
