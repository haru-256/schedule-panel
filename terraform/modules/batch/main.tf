# allow to use the google cloud service api
resource "google_project_service" "services" {
  for_each = toset([
    "batch.googleapis.com", "compute.googleapis.com", "logging.googleapis.com", "storage.googleapis.com"
  ])

  project            = var.gcp_project_id
  service            = each.value
  disable_on_destroy = true
}

# TODO: service account for cloud batch and grant permissions
# roles/batch.jobsEditor, roles/iam.serviceAccountUser) on the Compute Engine default service account,
# resource "google_service_account_iam_member" "batch" {
#   service_account_id = data.google_compute_default_service_account.default.name
#   role               = "roles/iam.serviceAccountUser"
#   member             = "serviceAccount:${google_project_service_account.batch.email}"
# }

# TODO: grand permissions to compute engine default service account, roles/batch.agentReporter, roles/logging.logWriter
data "google_compute_default_service_account" "default" {
  project = var.gcp_project_id
}
resource "google_project_iam_member" "gce_default_sa" {
  for_each = toset([
    "roles/batch.agentReporter", "roles/logging.logWriter"
  ])

  project    = var.gcp_project_id
  role       = each.value
  member     = "serviceAccount:${data.google_compute_default_service_account.default.email}"
  depends_on = [google_project_service.services]
}

# create compute engine network to used in batch vm instances.
resource "google_compute_network" "batch" {
  project                 = var.gcp_project_id
  name                    = "batch"
  auto_create_subnetworks = false
}
resource "google_compute_subnetwork" "batch_us_central1" {
  name                     = "batch"
  ip_cidr_range            = "10.128.0.0/20"
  region                   = "us-central1"
  network                  = google_compute_network.batch.id
  private_ip_google_access = true
}
resource "google_compute_router" "batch" {
  name    = "batch"
  project = var.gcp_project_id
  region  = var.gcp_region
  network = google_compute_network.batch.self_link
}
resource "google_compute_router_nat" "batch" {
  name                               = "batch"
  router                             = google_compute_router.batch.name
  region                             = google_compute_router.batch.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}
