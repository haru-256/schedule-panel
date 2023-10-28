.PHONY: help submit submit-error-job submit-success-job delete-error-job delete-success-job delete

.DEFAULT_GOAL := help

submit: # deploy job
	gcloud batch jobs submit $(JOB) \
		--project=haru256-schedule-panel \
		--location=us-central1 \
		--config=$(JOB_CONF)

submit-success-job: # deploy success cloud-batch jobs
	$(MAKE) submit JOB=sample-batch-success JOB_CONF=success_job.json

submit-error-job: # deploy error cloud-batch jobs
	$(MAKE) submit JOB=sample-batch-error JOB_CONF=error_job.json

delete: # delete job
	gcloud batch jobs delete \
		projects/haru256-schedule-panel/locations/us-central1/jobs/$(JOB)

delete-success-job: # delete success cloud-batch jobs
	$(MAKE) delete JOB=sample-batch-success

delete-error-job: # delete error cloud-batch jobs
	$(MAKE) delete JOB=sample-batch-error

help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done
