resource "kubernetes_manifest" "ingress" {
  manifest = yamldecode(file("${path.module}/../../../k8s/ingress.yaml"))
}
