use crate::db::Hotel;
use axum::{extract::State, Json};
use sqlx::PgPool;

pub async fn get_hotels(State(pool): State<PgPool>) -> Json<Vec<Hotel>> {
    let hotels = sqlx::query_as!(Hotel, "SELECT id, name, location, rating, price FROM hotel")
        .fetch_all(&pool)
        .await
        .unwrap();

    Json(hotels)
}
