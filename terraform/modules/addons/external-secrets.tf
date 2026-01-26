resource "helm_release" "external_secrets" {
  name       = "external-secrets"
  namespace  = "kube-system"
  repository = "https://charts.external-secrets.io"
  chart      = "external-secrets"
  version    = "0.9.13"

  set = [
    {
      name  = "installCRDs"
      value = "true"
    }
  ]
}
