use actix_web::{dev::HttpServiceFactory, post, web};
use serde::{Deserialize, Serialize};

use crate::{
    data::{AppData, User},
    responses::Response,
};

pub fn service() -> impl HttpServiceFactory {
    web::scope("/oauth").service(register).service(token)
}

#[derive(Deserialize)]
struct RegisterData {
    email: String,
    username: String,
    password: String,
}

#[post("/register")]
async fn register(data: web::Data<AppData>, request: web::Json<RegisterData>) -> Response<()> {
    let RegisterData {
        email,
        username,
        password,
    } = request.0;

    match data.users.write() {
        Err(_) => Response::internal_error("Lock failed".to_string()),
        Ok(mut users) => match users
            .iter()
            .find(|user| user.email == email || user.username == username)
            .is_some()
        {
            true => Response::conflict("User already exists".to_string()),
            false => {
                users.push(User {
                    email,
                    username,
                    password,
                    reddit: None,
                    spotify: None,
                    widgets: Vec::new(),
                    widget_counter: 0,
                });
                Response::created(())
            }
        },
    }
}

#[derive(Deserialize)]
struct LoginData {
    grant_type: String,
    email: String,
    password: String,
}

#[post("/token")]
async fn token(data: web::Data<AppData>, request: web::Form<LoginData>) -> Response<Token> {
    let LoginData {
        grant_type,
        email,
        password,
    } = request.0;

    if grant_type != "password" {
        return Response::bad_request("Invalid grant type".to_string());
    }

    match data.users.read() {
        Err(_) => Response::internal_error("Lock failed".to_string()),
        Ok(users) => match users
            .iter()
            .find(|user| user.email == email && user.password == password)
        {
            Some(user) => Response::created(Token {
                access_token: user.username.clone(),
                access_token_expires_at: "2021-03-02 17:49:36.156000".to_string(),
            }),
            None => Response::unauthorized("Invalid login".to_string()),
        },
    }
}

#[derive(Serialize)]
struct Token {
    access_token: String,
    access_token_expires_at: String,
}
