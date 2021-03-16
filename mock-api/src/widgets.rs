use actix_web::{delete, dev::HttpServiceFactory, get, patch, post, web};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use serde::{Deserialize, Serialize};

use crate::{
    data::{AppData, Widget, WidgetConfig, WidgetType},
    responses::Response,
};

pub fn service() -> impl HttpServiceFactory {
    web::scope("/widget")
        .service(get)
        .service(add)
        .service(config)
        .service(delete)
}

#[get("/list")]
async fn get(data: web::Data<AppData>, auth: BearerAuth) -> Response<Vec<Widget>> {
    data.map_to_user(auth.token(), |user| Response::ok(user.widgets.clone()))
}

#[post("")]
async fn add(
    data: web::Data<AppData>,
    auth: BearerAuth,
    request: web::Json<AddData>,
) -> Response<AddResponse> {
    data.map_to_user_mut(auth.token(), |user| {
        if let Some(widget) = widget_from_add_data(request.0, user.widget_counter) {
            user.widgets.push(widget);
            user.widget_counter += 1;

            Response::ok(AddResponse {
                widget_id: user.widget_counter - 1,
            })
        } else {
            Response::bad_request("Invalid type_name".to_string())
        }
    })
}

#[derive(Deserialize)]
struct AddData {
    type_name: String,
    config: Option<WidgetConfig>,
}

#[derive(Serialize)]
struct AddResponse {
    widget_id: usize,
}

fn widget_from_add_data(data: AddData, id: usize) -> Option<Widget> {
    let has_config = data
        .config
        .as_ref()
        .map(|conf| conf.name.is_some() || conf.number.is_some())
        .unwrap_or(false);
    let widget_type = type_from_name(&data.type_name)?;

    if widget_type.configurable != has_config {
        return None;
    }

    Some(Widget {
        id,
        widget_type,
        config: data.config.unwrap_or(WidgetConfig::default()),
    })
}

fn type_from_name(name: &str) -> Option<&'static WidgetType> {
    WIDGETS.iter().find(|widget| widget.name == name)
}

const WIDGETS: [WidgetType; 9] = [
    WidgetType {
        name: "reddit_profile",
        configurable: false,
    },
    WidgetType {
        name: "reddit_hots",
        configurable: true,
    },
    WidgetType {
        name: "reddit_spotlights",
        configurable: false,
    },
    WidgetType {
        name: "spotify_profile",
        configurable: false,
    },
    WidgetType {
        name: "spotify_music",
        configurable: true,
    },
    WidgetType {
        name: "spotify_podcast",
        configurable: true,
    },
    WidgetType {
        name: "github_profile",
        configurable: false,
    },
    WidgetType {
        name: "github_spotlights",
        configurable: false,
    },
    WidgetType {
        name: "github_issues",
        configurable: false,
    },
];

#[patch("/{id}")]
async fn config(
    data: web::Data<AppData>,
    auth: BearerAuth,
    id: web::Path<usize>,
    config: web::Json<ConfigBody>,
) -> Response<()> {
    let id = id.0;
    let config = config.0.config;

    data.map_to_user_mut(auth.token(), |user| {
        match user.widgets.iter_mut().find(|widget| widget.id == id) {
            Some(widget) => {
                widget.config = config;

                Response::ok(())
            }
            None => Response::not_found(format!("Widget {} not found", id)),
        }
    })
}

#[derive(Deserialize)]
struct ConfigBody {
    config: WidgetConfig,
}

#[delete("/{id}")]
async fn delete(data: web::Data<AppData>, auth: BearerAuth, id: web::Path<usize>) -> Response<()> {
    let id = id.0;

    data.map_to_user_mut(auth.token(), |user| {
        let initial_len = user.widgets.len();

        user.widgets.retain(|widget| widget.id != id);

        if user.widgets.len() != initial_len {
            Response::ok(())
        } else {
            Response::not_found(format!("Widget {} not found", id))
        }
    })
}
