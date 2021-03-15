use actix_web::{dev::HttpServiceFactory, get, put, web};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use serde::Serialize;

use crate::{
    data::{AppData, LinkData, User},
    responses::{self, Response, ServiceStatus},
};

pub fn service() -> impl HttpServiceFactory {
    web::scope("/github")
        .service(link)
        .service(unlink)
        .service(status)
        .service(profile)
        .service(spotlights)
        .service(issues)
}

fn check_link<F, R>(user: &User, f: F) -> Response<R>
where
    F: FnOnce(&User) -> Response<R>,
    R: Serialize,
{
    if let Some(_) = user.github {
        f(user)
    } else {
        Response::forbidden(format!(
            "User {} have not linked their Github account.",
            user.username
        ))
    }
}

#[put("/link")]
async fn link(
    data: web::Data<AppData>,
    auth: BearerAuth,
    request: web::Json<LinkData>,
) -> Response<()> {
    let LinkData { code } = request.0;

    data.map_to_user_mut(auth.token(), |user| {
        user.github = Some(code);

        Response::ok(())
    })
}

#[put("/unlink")]
async fn unlink(data: web::Data<AppData>, auth: BearerAuth) -> Response<()> {
    data.map_to_user_mut(auth.token(), |user| {
        user.github = None;

        Response::ok(())
    })
}

#[get("/status")]
async fn status(data: web::Data<AppData>, auth: BearerAuth) -> Response<ServiceStatus> {
    data.map_to_user(auth.token(), |user| {
        responses::status(user.github.is_some())
    })
}

#[get("/profile")]
async fn profile(data: web::Data<AppData>, auth: BearerAuth) -> Response<ProfileResponse> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| {
            Response::ok(ProfileResponse {
                name: "monalisa octocat".to_string(),
                avatar_url: "https://avatars.githubusercontent.com/u/18119032".to_string(),
                account_url: "https://github.com/octocat".to_string(),
                company: "GitHub".to_string(),
                location: "San Francisco".to_string(),
                bio: "There once was...".to_string(),
                public_repos: 2,
                private_repos: 100,
                public_gists: 1,
                private_gists: 81,
                followers: 20,
                following: 0,
                updated_at: "2008-01-14T04:33:35Z".to_string(),
            })
        })
    })
}

#[derive(Serialize)]
struct ProfileResponse {
    name: String,
    avatar_url: String,
    account_url: String,
    company: String,
    location: String,
    bio: String,
    public_repos: usize,
    private_repos: usize,
    public_gists: usize,
    private_gists: usize,
    followers: usize,
    following: usize,
    updated_at: String,
}

#[get("/spotlights")]
async fn spotlights(data: web::Data<AppData>, auth: BearerAuth) -> Response<Vec<Repository>> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| Response::ok(spotlights_response()))
    })
}

fn spotlights_response() -> Vec<Repository> {
    let mut pos = 0;

    std::iter::from_fn(move || {
        let nbr = pos;
        pos += 1;

        Some(Repository::from(nbr))
    })
    .take(10)
    .collect()
}

#[derive(Serialize)]
struct Repository {
    name: String,
    full_name: String,
    description: String,
    owner: Profile,
    repo_url: String,
    created_at: String,
    updated_at: String,
    pushed_at: String,
    stargazers_count: usize,
    watchers_count: usize,
    language: String,
    score: usize,
    open_issues: usize,
}

impl<T> From<T> for Repository
where T: std::fmt::Display
{
    fn from(id: T) -> Self
    {
        Self {
            name: format!("repo-{}", id),
            full_name: format!("user_{}/repo-{}", id, id),
            description: "This is just another randomly generated repository".to_string(),
            owner: Profile::from(id),
            repo_url: "https://github.com/Brettm12345/twending".to_string(),
            created_at: "2016-09-20T15:05:06.000Z".to_string(),
            updated_at: "2016-09-20T15:05:06.000Z".to_string(),
            pushed_at: "2016-09-20T15:05:06.000Z".to_string(),
            stargazers_count: 9999999,
            watchers_count: 940835209,
            language: "Cobol".to_string(),
            score: 1,
            open_issues: 9999,
        }
    }
}

#[get("/issues")]
async fn issues(data: web::Data<AppData>, auth: BearerAuth) -> Response<Vec<Issue>> {
    data.map_to_user(auth.token(), |user| {
        check_link(user, |_| Response::ok(issues_response()))
    })
}

fn issues_response() -> Vec<Issue> {
    let mut pos = 0;

    std::iter::from_fn(move || {
        let nbr = pos;
        pos += 1;

        Some(Issue::from(nbr))
    }).take(10).collect()
}

#[derive(Serialize)]
struct Issue {
    issue_url: String,
    number: usize,
    state: String,
    title: String,
    body: String,
    user: Profile,
    labels: Vec<Label>,
    assignees: Vec<Profile>,
    comments: usize,
    created_at: String,
    updated_at: String,
    closed_at: String,
    repository: Repository,
}

impl From<usize> for Issue
{
    fn from(id: usize) -> Self {
        Self {
            issue_url: "https://github.com/microsoft/TypeScript/issues/43226".to_string(),
            number: id,
            state: "open".to_string(),
            title: format!("Issue {}", id),
            body: "The application is on fire.".to_string(),
            user: Profile::from(id),
            labels: vec![
                Label {
                    name: "documentation".to_string(),
                    description: "Improvements or additions to documentation".to_string(),
                    color: "0075ca".to_string(),
                },
                Label {
                    name: "duplicate".to_string(),
                    description: "This issue or pull request already exists".to_string(),
                    color: "cfd3d7".to_string(),
                },
                Label {
                    name: "enhancement".to_string(),
                    description: "New feature or request".to_string(),
                    color: "a2eeef".to_string(),
                },
            ],
            assignees: vec![
                Profile::from(0),
                Profile::from(1),
                Profile::from(2),
            ],
            comments: 658765,
            created_at: "2016-09-20T15:05:06.000Z".to_string(),
            updated_at: "2016-09-20T15:05:06.000Z".to_string(),
            closed_at: "1970-01-01T00:00:00.000Z".to_string(),
            repository: Repository::from(id),
        }
    }
}

#[derive(Serialize)]
struct Profile {
    login: String,
    avatar_url: String,
    account_url: String,
    #[serde(rename = "type")]
    account_type: String,
    site_admin: bool,
}

impl<T> From<T> for Profile
where T: std::fmt::Display
{
    fn from(id: T) -> Self
    {
        Self {
            login: format!("user_{}", id),
            avatar_url: "https://avatars.githubusercontent.com/u/7571012".to_string(),
            account_url: "https://github.com/Brettm12345".to_string(),
            account_type: "User".to_string(),
            site_admin: false,
        }
    }
}

#[derive(Serialize)]
struct Label {
    name: String,
    description: String,
    color: String,
}
