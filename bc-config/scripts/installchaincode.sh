#!/bin/bash

# import utils
. scripts/utils.sh

# Variable setup
CHANNEL_NAME="mychannel"
LANGUAGE="node"
CC_VERSION="1.0"

## Install chaincode on peer0.org1 and peer0.org2
echo "<<<<<< 1) -Start installing academic records chaincode--->>>>>>>> "
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/academic-records/"
CC_NAME="academicrecordscc"

installChaincode 0 1
installChaincode 1 1

installChaincode 0 2
installChaincode 1 2

sleep 5

echo "============= Chaincode Installed On All Peers ========"

