
#!/bin/bash

# import utils
. scripts/utils.sh

# Variable setup
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/checklist-template/"
CC_NAME="checklistcc"
CC_VERSION="1.10"
LANGUAGE="node"
CHANNEL_NAME="mychannel"

installChaincode 0 1
installChaincode 1 1
 
installChaincode 0 2
installChaincode 1 2

installChaincode 0 3
installChaincode 1 3

installChaincode 0 4
installChaincode 1 4


upgradeChaincode 0 1 $CC_VERSION

queryChaincode 0 1
queryChaincode 1 1
queryChaincode 0 1
queryChaincode 0 2
queryChaincode 1 2
queryChaincode 0 3
queryChaincode 1 3
queryChaincode 0 4
queryChaincode 1 4