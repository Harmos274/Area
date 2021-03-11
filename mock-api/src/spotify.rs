use actix_web::{dev::HttpServiceFactory, get, post, web};
use actix_web_httpauth::extractors::bearer::BearerAuth;

use crate::{
    data::{AppData, LinkData},
    responses::{self, Response, ServiceStatus},
};

pub fn service() -> impl HttpServiceFactory {
    web::scope("/spotify")
        .service(link)
        .service(unlink)
        .service(status)
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
