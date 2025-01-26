use axum::routing::get;
use axum::Router;
use sqlx::PgPool;

mod hotel;

pub fn create_routes(pool: PgPool) -> Router {
    Router::new()
        .route("/hotels", get(hotel::get_hotels)) // Attach the route
        .with_state(pool)
}
