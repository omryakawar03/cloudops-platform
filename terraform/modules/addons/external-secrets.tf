resource "aws_secretsmanager_secret" "backend" {
  name = "cloudops/backend"
}

resource "aws_secretsmanager_secret_version" "backend" {
  secret_id = aws_secretsmanager_secret.backend.id

  secret_string = jsonencode({
    PORT        = "3001"
    APP_ENV     = "prod"
    APP_NAME    = "cloudops-platform"
    APP_VERSION = "1.0.0"
    MONGO_URI   = "mongodb://mongo:27017/cloudops"
  })
}
