
# -------------------------
# IAM Role for EKS Cluster
# -------------------------

# Create an IAM assume role policy document for EKS cluster
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    # Allow EKS service (eks.amazonaws.com) to assume the role
    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }

    # Allow STS assume role action
    actions = ["sts:AssumeRole"]
  }
}

# Create IAM Role for EKS Cluster
resource "aws_iam_role" "IAMRoleForEKSCluster" {
  name               = "eks-cluster-cloud"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Attach AmazonEKSClusterPolicy to the IAM Role
# This policy allows the cluster to manage AWS resources
resource "aws_iam_role_policy_attachment" "AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.IAMRoleForEKSCluster.name
}


# -------------------------
# EKS Cluster Setup
# -------------------------

resource "aws_eks_cluster" "cloudops_cluster" {
  name     = var.cluster_name
  role_arn = aws_iam_role.IAMRoleForEKSCluster.arn

  # Attach cluster to VPC subnets
  vpc_config {
    subnet_ids = var.private_subnets
  }

  # Ensure IAM Role permissions are created before the cluster
  depends_on = [
    aws_iam_role_policy_attachment.AmazonEKSClusterPolicy,
  ]
}

# -------------------------
# IAM Role for Node Group
# -------------------------

# Create IAM Role for EKS Node Group (EC2 Instances)
resource "aws_iam_role" "IAMRoleForNodeGroup" {
  name = "eks-node-group-cloud"

  # Allow EC2 instances to assume the role
  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

# Attach worker node policies required for Node Group
# 1. AmazonEKSWorkerNodePolicy → Allows worker nodes to join the cluster
resource "aws_iam_role_policy_attachment" "AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.IAMRoleForNodeGroup.name
}

# 2. AmazonEKS_CNI_Policy → Allows networking (VPC CNI plugin)
resource "aws_iam_role_policy_attachment" "AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.IAMRoleForNodeGroup.name
}

# 3. AmazonEC2ContainerRegistryReadOnly → Allows pulling container images from ECR
resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.IAMRoleForNodeGroup.name
}

# -------------------------
# EKS Node Group Setup
# -------------------------

resource "aws_eks_node_group" "cloudops_node_group" {
  cluster_name    = aws_eks_cluster.cloudops_cluster.name
  node_group_name = "Node-cloudops"
  node_role_arn   = aws_iam_role.IAMRoleForNodeGroup.arn
  subnet_ids      = var.private_subnets

  # Auto-scaling configuration for node group
  scaling_config {
    desired_size = var.node_desired_size  # Default number of nodes
    max_size     = var.node_max_size  # Maximum number of nodes
    min_size     = var.node_min_size  # Minimum number of nodes
  }

  # EC2 instance type for worker nodes
  instance_types = var.node_instance_types

  # Ensure IAM Role policies are created before node group
  depends_on = [
    aws_iam_role_policy_attachment.AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.AmazonEC2ContainerRegistryReadOnly,
  ]
}
