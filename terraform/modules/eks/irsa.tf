module "irsa" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "5.39.0"

  role_name = "cloudops-irsa"

  attach_load_balancer_controller_policy = true

  role_policy_arns = {
    secrets = aws_iam_policy.secrets_read.arn
  }

  oidc_providers = {
    eks = {
      provider_arn = module.eks.oidc_provider_arn
      namespace_service_accounts = [
        "cloudops:backend-sa",
        "kube-system:external-secrets"
      ]
    }
  }
}

resource "aws_iam_policy" "secrets_read" {
  name = "cloudops-secrets-read"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["secretsmanager:GetSecretValue"]
      Resource = "*"
    }]
  })
}
