.PHONY: help gen_requirements build push run-local

.DEFAULT_GOAL := help

lock: # generate Pipfile.lock
	pipenv lock

build: # build docker image
	docker build -t \
		us-central1-docker.pkg.dev/haru256-schedule-panel/batch/sample-batch-gpu:latest .

push: # image upload to google cloud artifact registry
	docker push us-central1-docker.pkg.dev/haru256-schedule-panel/batch/sample-batch-gpu:latest

run-local: # run src/main.ipynb on local
	# jupyter nbconvert --to html --output=output.html --log-level=DEBUG --execute src/main.ipynb
	python src/main.py

help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done
