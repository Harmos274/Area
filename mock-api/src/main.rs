mod arguments;
mod data;
mod github;
mod oauth;
mod reddit;
mod responses;
mod spotify;
mod widgets;

use actix_cors::Cors;
use actix_service::Service;
use actix_web::{App, HttpServer};
use std::sync::{Arc, RwLock};

use arguments::Arguments;
use data::AppData;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let Arguments { ip, port, delay } = arguments::parse();
    let users = Arc::new(RwLock::new(Vec::new()));

    println!(
        "Launching the mock server on {}:{} with a delay of {} milliseconds",
        ip,
        port,
        delay.as_millis()
    );

    HttpServer::new(move || {
        App::new()
            .wrap_fn(move |req, srv| {
                std::thread::sleep(delay);

                srv.call(req)
            })
            .wrap(Cors::permissive())
            .data(AppData {
                users: users.clone(),
            })
            .service(oauth::service())
            .service(reddit::service())
            .service(github::service())
            .service(spotify::service())
            .service(widgets::service())
    })
    .bind(format!("{}:{}", ip, port))?
    .run()
    .await
}
