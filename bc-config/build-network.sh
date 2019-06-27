#!/bin/bash

# Variable setup
CHANNEL_NAME="mychannel"
LANGUAGE="node"

clear
./byfn.sh down
./byfn.sh up -c $CHANNEL_NAME -l $LANGUAGE

