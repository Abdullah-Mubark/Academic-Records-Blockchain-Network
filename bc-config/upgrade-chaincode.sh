#!/bin/bash

# Variables setup
CHANNEL_NAME="mychannel"
LANGUAGE="node"
VERBOSE="false"
CLI_TIMEOUT="10"
CLI_DELAY="3"

echo "Install chaincode..."

docker exec $(docker ps -q --filter "name=cli") scripts/upgradechaincode.sh $CHANNEL_NAME $CLI_DELAY $LANGUAGE $CLI_TIMEOUT $VERBOSE
if [ $? -ne 0 ]; then
echo "ERROR !!!! install chaincode failed"
exit 1
fi