DEFAULT_GOAL := help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: gen_requirements
gen_requirements: # geneerate requirements.txt
	pipenv lock && pipenv requirements > ./requirements.txt

.PHONY: build
build: # build docker image
	docker build -t sample-batch:latest .

.PHONY: run-local
run-local: # run src/main.ipynb on local
	jupyter nbconvert --to html --output=output.html --log-level=DEBUG --execute src/main.ipynb
