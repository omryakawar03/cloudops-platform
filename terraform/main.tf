terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws        = { source = "hashicorp/aws" }
    kubernetes = { source = "hashicorp/kubernetes" }
    helm       = { source = "hashicorp/helm" }
  }
}

# ---------- VPC ----------
module "vpc" {
  source   = "./modules/vpc"
  vpc_cidr = var.vpc_cidr
  region   = var.aws_region
}

# ---------- EKS ----------
module "eks" {
  source          = "./modules/eks"
  cluster_name    = var.cluster_name
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  region          = var.aws_region
}

# ---------- ADDONS ----------
module "addons" {
  source             = "./modules/addons"
  cluster_name       = module.eks.cluster_name
  cluster_endpoint   = module.eks.cluster_endpoint
  cluster_ca         = module.eks.cluster_ca
  oidc_provider_arn  = module.eks.oidc_provider_arn
  region             = var.aws_region
}

# ---------- WORKLOADS ----------
module "workloads" {
  source            = "./modules/workloads"
  cluster_name      = module.eks.cluster_name
  depends_on        = [module.addons]
}
