#!/bin/bash

# Variables setup
CHANNEL_NAME="mychannel"
LANGUAGE="node"
VERBOSE="false"
CLI_TIMEOUT="10"
CLI_DELAY="3"

## Create channel
echo "Creating channel..."

docker exec $(docker ps -q --filter "name=cli") scripts/createchannel.sh $CHANNEL_NAME $CLI_DELAY $LANGUAGE $CLI_TIMEOsoUT $VERBOSE
if [ $? -ne 0 ]; then
echo "ERROR !!!! channel creation failed"
exit 1
fi
  
