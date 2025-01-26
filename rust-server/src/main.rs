mod config;
mod db;
mod routes;

use config::load_config;
use db::create_pool;

#[tokio::main]
async fn main() {
    // Load configuration
    let config = load_config();

    // Set up the database connection pool
    let pool = create_pool(&config.database_url).await;

    // Set up the routes and pass the database pool as state
    let app = routes::create_routes(pool);

    // Start the HTTP server
    let addr = ([127, 0, 0, 1], config.port).into();
    println!("Listening on http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
