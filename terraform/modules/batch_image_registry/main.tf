# allow to use the google cloud service api
resource "google_project_service" "services" {
  for_each = toset([
    "artifactregistry.googleapis.com"
  ])
  project            = var.gcp_project_id
  service            = each.key
  disable_on_destroy = true
}

# create the batch image repository
resource "google_artifact_registry_repository" "batch" {
  project       = var.gcp_project_id
  location      = var.gcp_region
  repository_id = "batch"
  description   = "batch repository"
  format        = "DOCKER"

  depends_on = [google_project_service.services]
}
