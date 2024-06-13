#!/bin/bash
set -ex

DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
REGISTRY=harbor.edibo.info/lab
echo "mWydAO6PCoScenRjO8mL2utskPYQhI" | docker login $REGISTRY --username ci --password-stdin

# build and push image to Harbor registry
export HARBOR_TAG="harbor.edibo.info/lab/digikala/b2b-bot-node-app:latest"

docker buildx build --platform linux/amd64 --tag "$HARBOR_TAG" --progress=plain "$DIR"
docker save -o "$DIR"/digikala-b2b-bot-node-app.tar "$HARBOR_TAG"

rsync -avzhP --delete --rsh='ssh -p 2112' "$DIR"/digikala-b2b-bot-node-app.tar root@82.102.15.253:~/digikala-b2b-bot-node-app.tar

rm "$DIR"/digikala-b2b-bot-node-app.tar