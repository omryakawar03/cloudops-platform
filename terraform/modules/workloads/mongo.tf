resource "kubernetes_manifest" "mongo_svc" {
  manifest = yamldecode(file("${path.module}/../../../k8s/mongo/service.yaml"))
}

resource "kubernetes_manifest" "mongo_sts" {
  manifest = yamldecode(file("${path.module}/../../../k8s/mongo/statefulset.yaml"))
}
