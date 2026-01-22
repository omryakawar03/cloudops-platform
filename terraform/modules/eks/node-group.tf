module "node_group" {
  source  = "terraform-aws-modules/eks/aws//modules/eks-managed-node-group"
  version = "20.8.4"

  cluster_name = module.eks.cluster_name
  subnet_ids   = var.private_subnets

  instance_types = ["c7i-flex.large"]
  min_size = 2
  desired_size = 2
  max_size = 4
}
