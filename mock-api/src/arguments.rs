use std::time::Duration;

use clap::Arg;

pub fn parse() -> Arguments {
    let matches = clap::App::new("Area mock server")
        .version("0.1.0")
        .arg(
            Arg::with_name("IP")
                .short("i")
                .long("ip")
                .value_name("IP")
                .takes_value(true)
                .default_value("localhost"),
        )
        .arg(
            Arg::with_name("Port")
                .short("p")
                .long("port")
                .value_name("PORT")
                .takes_value(true)
                .default_value("12000"),
        )
        .arg(
            Arg::with_name("Delay")
                .short("d")
                .long("delay")
                .value_name("DELAY")
                .help("Added delay to each request, in milliseconds.")
                .takes_value(true)
                .default_value("0"),
        )
        .get_matches();

    Arguments {
        delay: Duration::from_millis(
            matches
                .value_of("Delay")
                .map(|delay| delay.parse().expect("Invalid delay"))
                .unwrap_or(0),
        ),
        ip: matches.value_of("IP").unwrap_or("localhost").to_string(),
        port: matches
            .value_of("Port")
            .map(|port| port.parse().expect("Invalid port"))
            .unwrap_or(12000),
    }
}

pub struct Arguments {
    pub delay: Duration,
    pub ip: String,
    pub port: u32,
}
