# google cloud project
data "google_project" "project" {
  project_id = var.gcp_project_id
}

# create the bucket for terraform state
module "tfstate_bucket" {
  source         = "./modules/tfstate_bucket"
  gcp_project_id = data.google_project.project.project_id
}

# create the batch image repository
module "batch_image_registry" {
  source         = "./modules/batch_image_registry"
  gcp_project_id = data.google_project.project.project_id
  gcp_region     = var.gcp_default_region
}

# create cloud batch
module "batch" {
  source         = "./modules/batch"
  gcp_project_id = data.google_project.project.project_id
  gcp_region     = var.gcp_default_region
}
