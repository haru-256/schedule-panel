terraform {
  required_version = "~> 1.6.2"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.3.0"
    }
  }

  backend "gcs" {
    bucket = "haru256-schedule-panel-tfstate"
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_default_region
}
