resource "kubernetes_manifest" "frontend" {
  manifest = yamldecode(file("${path.module}/../../../k8s/frontend/deployment.yaml"))
}
