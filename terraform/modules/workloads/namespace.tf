resource "kubernetes_namespace" "cloudops" {
  metadata { name = "cloudops" }
}