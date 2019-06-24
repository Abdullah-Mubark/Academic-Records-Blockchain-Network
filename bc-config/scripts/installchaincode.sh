#!/bin/bash

# import utils
. scripts/utils.sh

# Variable setup
CHANNEL_NAME="mychannel"
LANGUAGE="node"
CC_VERSION="1.07"

## Install chaincode on peer0.rm and peer0.cd
echo "<<<<<< 1) -Start installing checklist template chaincode--->>>>>>>> "
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/checklist-template/"
CC_NAME="checklistcc"

installChaincode 0 1
installChaincode 1 1

installChaincode 0 2
installChaincode 1 2

installChaincode 0 3
installChaincode 1 3

installChaincode 0 4
installChaincode 1 4


sleep 5
echo "<<<<<< 2) -Start installing process template chaincode--->>>>>>>> "
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/process-template/"
CC_NAME="processtemplatecc"
installChaincode 0 1
installChaincode 1 1

installChaincode 0 2
installChaincode 1 2

installChaincode 0 3
installChaincode 1 3

installChaincode 0 4
installChaincode 1 4


sleep 5
echo "<<<<<< 3) -Start installing process instance chaincode--->>>>>>>> "
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/process-instance/"
CC_NAME="processinstancecc"
installChaincode 0 1
installChaincode 1 1

installChaincode 0 2
installChaincode 1 2

installChaincode 0 3
installChaincode 1 3

installChaincode 0 4
installChaincode 1 4



sleep 5
echo "<<<<<< 4) -Start installing unified-schema chaincode--->>>>>>>> "
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/unified-schema/"
CC_NAME="unifiedschemacc"
installChaincode 0 1
installChaincode 1 1

installChaincode 0 2
installChaincode 1 2

installChaincode 0 3
installChaincode 1 3

installChaincode 0 4
installChaincode 1 4

echo "============= Chaincode Installed On All Peers ========"

