variable "gcp_project_id" {
  type        = string
  description = "The ID for your GCP project"
  default     = "haru256-schedule-panel"
}

variable "gcp_default_region" {
  type        = string
  description = "The name for your GCP default region"
  default     = "us-central1"
}
