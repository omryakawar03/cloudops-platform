resource "kubernetes_manifest" "backend" {
  manifest = yamldecode(file("${path.module}/../../../k8s/backend/deployment.yaml"))
}
