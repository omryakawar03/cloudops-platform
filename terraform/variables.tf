# -----------------------
# AWS
# -----------------------
variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "aws_profile" {
  description = "AWS CLI profile name"
  type        = string
}

# -----------------------
# VPC
# -----------------------
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
}

variable "azs" {
  description = "Availability Zones"
  type        = list(string)
}

variable "public_subnets" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
}

variable "private_subnets" {
  description = "Private subnet CIDR blocks"
  type        = list(string)
}

# -----------------------
# EKS
# -----------------------
variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "cluster_version" {
  description = "EKS k8s version"
  type = string
  
}

# -----------------------
# EKS Node Group
# -----------------------
variable "node_instance_types" {
  description = "EC2 instance types for EKS worker nodes"
  type        = list(string)
}

variable "node_min_size" {
  description = "Minimum number of EKS worker nodes"
  type        = number

}

variable "node_max_size" {
  description = "Maximum number of EKS worker nodes"
  type        = number

}

variable "node_desired_size" {
  description = "Desired number of EKS worker nodes"
  type        = number

}

# -----------------------
# Tags (Optional but Professional)
# -----------------------
variable "tags" {
  description = "Common tags for AWS resources"
  type        = map(string)

}
