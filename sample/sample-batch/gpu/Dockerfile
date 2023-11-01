
# export requirements from Pipfile
FROM --platform=linux/amd64 python:3.11 AS export
RUN pip --no-cache-dir install pipenv
COPY Pipfile ./
RUN pipenv lock && pipenv requirements > requirements.lock

# deploy image, install dependencies from build and copy source code from local
FROM --platform=linux/amd64 nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04 AS deploy
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.11 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN python3.11 -m pip install --no-cache-dir --upgrade pip
COPY --from=export /requirements.lock /
RUN python3.11 -m pip install --no-cache-dir -r /requirements.lock
WORKDIR /app
COPY . .
CMD [ "python3.11", "src/main.py" ]
