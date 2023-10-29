
# export requirements from Pipfile
FROM --platform=linux/amd64 python:3.11 AS export
RUN pip --no-cache-dir install pipenv
COPY Pipfile ./
RUN pipenv lock && pipenv requirements > requirements.lock

# build image, install dependencies
FROM --platform=linux/amd64 python:3.11 AS build
COPY --from=export /requirements.lock /
RUN pip install --no-cache-dir -r /requirements.lock

# deploy image, copy dependencies from build and source code from local
FROM --platform=linux/amd64 python:3.11-slim AS deploy
COPY --from=build /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=build /usr/local/bin /usr/local/bin
# copy nbconvert templates. more info:
# https://nbconvert.readthedocs.io/en/latest/customizing.html
COPY --from=build /usr/local/share/jupyter /usr/local/share/jupyter
WORKDIR /app
COPY . .
# CMD ["jupyter", "nbconvert", "--to=html", "--output=output.html", "--log-level=DEBUG", "--execute", "src/main.ipynb"]
CMD [ "python", "src/main.py" ]
