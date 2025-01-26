use dotenvy::dotenv;
use std::env;

pub struct Config {
    pub database_url: String,
    pub port: u16,
}

pub fn load_config() -> Config {
    dotenv().ok();
    Config {
        database_url: env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
        port: 5000,
    }
}
