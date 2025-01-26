use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(FromRow, Serialize, Deserialize, Debug)]
pub struct Hotel {
    pub id: i32,
    pub name: String,
    pub location: String,
    pub rating: Option<sqlx::types::BigDecimal>,
    pub price: Option<sqlx::types::BigDecimal>,
}
