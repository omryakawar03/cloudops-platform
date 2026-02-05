module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "21.15.1"

  name    = var.cluster_name
  kubernetes_version = var.cluster_version

  vpc_id     = var.vpc_id
  subnet_ids = var.private_subnets

  enable_irsa = true

  eks_managed_node_groups = {
     cluster_name    = var.cluster_name
  node_group_name = "Node-cloud"
  subnet_ids      = var.private_subnets
      scaling_config ={
      min_size       = var.node_min_size
      max_size       = var.node_max_size
      desired_size   = var.node_desired_size
    }
      instance_types = var.node_instance_types
  }
}
