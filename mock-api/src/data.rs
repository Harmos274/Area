use serde::{Deserialize, Serialize};
use std::sync::{Arc, RwLock};

use crate::responses::Response;

pub struct AppData {
    pub users: Arc<RwLock<Vec<User>>>,
}

impl AppData {
    pub fn map_to_user<T, F>(&self, token: &str, f: F) -> Response<T>
    where
        T: Serialize,
        F: FnOnce(&User) -> Response<T>,
    {
        match self.users.read() {
            Err(_) => Response::internal_error("Lock failed".to_string()),
            Ok(users) => match users.iter().find(|user| user.username == token) {
                None => Response::unauthorized("Invalid login".to_string()),
                Some(user) => f(user),
            },
        }
    }

    pub fn map_to_user_mut<T, F>(&self, token: &str, f: F) -> Response<T>
    where
        T: Serialize,
        F: FnOnce(&mut User) -> Response<T>,
    {
        match self.users.write() {
            Err(_) => Response::internal_error("Lock failed".to_string()),
            Ok(mut users) => match users.iter_mut().find(|user| user.username == token) {
                None => Response::unauthorized("Invalid login".to_string()),
                Some(user) => f(user),
            },
        }
    }
}

pub struct User {
    pub mail: String,
    pub username: String,
    pub password: String,

    pub reddit: Option<String>,
    pub spotify: Option<String>,
    pub github: Option<String>,

    pub widgets: Vec<Widget>,
    pub widget_counter: usize,
}

#[derive(Clone, Serialize)]
pub struct Widget {
    pub id: usize,
    #[serde(rename = "type")]
    pub widget_type: &'static WidgetType,
    pub config: WidgetConfig,
}

#[derive(Clone, Serialize)]
pub struct WidgetType {
    pub name: &'static str,
    pub configurable: bool,
}

#[derive(Clone, Default, Serialize, Deserialize)]
pub struct WidgetConfig {
    pub name: Option<String>,
    pub number: Option<i64>,
    pub refresh: Option<u64>,
}

#[derive(Deserialize)]
pub struct LinkData {
    pub code: String,
}
