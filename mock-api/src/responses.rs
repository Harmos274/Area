use std::future::{ready, Ready};

use actix_web::{dev::HttpResponseBuilder, http::StatusCode, HttpRequest, HttpResponse, Responder};
use serde::Serialize;

pub struct Response<T>
where
    T: Serialize,
{
    data: Result<T, String>,
    code: StatusCode,
}

impl<T> Response<T>
where
    T: Serialize,
{
    pub fn ok(data: T) -> Self {
        Self {
            data: Ok(data),
            code: StatusCode::OK,
        }
    }

    pub fn created(data: T) -> Self {
        Self {
            data: Ok(data),
            code: StatusCode::CREATED,
        }
    }

    pub fn bad_request(message: String) -> Self {
        Self {
            data: Err(message),
            code: StatusCode::BAD_REQUEST,
        }
    }

    pub fn unauthorized(message: String) -> Self {
        Self {
            data: Err(message),
            code: StatusCode::UNAUTHORIZED,
        }
    }

    pub fn forbidden(message: String) -> Self {
        Self {
            data: Err(message),
            code: StatusCode::FORBIDDEN,
        }
    }

    pub fn not_found(message: String) -> Self {
        Self {
            data: Err(message),
            code: StatusCode::CONFLICT,
        }
    }

    pub fn conflict(message: String) -> Self {
        Self {
            data: Err(message),
            code: StatusCode::CONFLICT,
        }
    }

    pub fn internal_error(message: String) -> Self {
        Self {
            data: Err(message),
            code: StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl<T> Responder for Response<T>
where
    T: Serialize,
{
    type Error = actix_web::Error;

    type Future = Ready<Result<HttpResponse, Self::Error>>;

    fn respond_to(self, req: &HttpRequest) -> Self::Future {
        let success = self.code.is_success();
        let uri = req.uri();

        println!("Responding from {}", uri);

        let body = match self.data {
            Ok(data) => serde_json::to_string(&ResponseModel { success, data }),
            Err(message) => serde_json::to_string(&ResponseModel {
                success,
                data: Error::new(uri.to_string(), message),
            }),
        };

        ready(Ok(match body {
            Ok(serialized) => HttpResponseBuilder::new(self.code)
                .content_type("application/json")
                .body(serialized),
            Err(_) => HttpResponse::InternalServerError().body("Serialization failure"),
        }))
    }
}

#[derive(Serialize)]
struct ResponseModel<T>
where
    T: Serialize,
{
    success: bool,
    data: T,
}

#[derive(Serialize)]
pub struct Error<T>
where
    T: Serialize,
{
    source: String,
    message: T,
}

impl<T> Error<T>
where
    T: Serialize,
{
    fn new(source: String, message: T) -> Self {
        Self { source, message }
    }
}

pub fn status(logged_in: bool) -> Response<ServiceStatus> {
    Response::ok(ServiceStatus { logged_in })
}

#[derive(Serialize)]
pub struct ServiceStatus {
    logged_in: bool,
}
