.PHONY: format lint plan apply help

.DEFAULT_GOAL := help

format: # format terraform
	terraform fmt -recursive

lint: # lint terraform
	tflint --recursive --config $(PWD)/.tflint.hcl
	trivy config . --severity=HIGH,CRITICAL

plan: # terraform plan
	$(MAKE) format
	$(MAKE) lint
	terraform plan

apply: # terraform apply
	$(MAKE) format
	$(MAKE) lint
	terraform apply

help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done
