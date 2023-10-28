output "batch_car_id" {
  value       = google_artifact_registry_repository.batch.id
  description = "The ID of the image repository for batch"
}
