# -----------------------
# AWS
# -----------------------
aws_region  = "ap-south-1"
aws_profile = "cloudops"

# -----------------------
# VPC
# -----------------------
vpc_cidr = "10.0.0.0/16"

azs = [
  "ap-south-1a",
  "ap-south-1b"
]

public_subnets = [
  "10.0.101.0/24",
  "10.0.102.0/24"
]

private_subnets = [
  "10.0.1.0/24",
  "10.0.2.0/24"
]

# -----------------------
# EKS
# -----------------------
cluster_name    = "cloudops-eks"
cluster_version = "1.29"

# -----------------------
# EKS Node Group
# -----------------------
node_instance_types = ["c7i.large"]

node_min_size     = 1
node_max_size     = 3
node_desired_size = 1

# -----------------------
# Tags
# -----------------------
tags = {
  Project     = "cloudops-platform"
  Environment = "prod"
  Owner       = "omkar"
  ManagedBy   = "terraform"
}
