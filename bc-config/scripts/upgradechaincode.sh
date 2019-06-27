
#!/bin/bash

# import utils
. scripts/utils.sh

# Variable setup
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/academic-records/"
CC_NAME="academicrecordscc"
CC_VERSION="1.1"
LANGUAGE="node"
CHANNEL_NAME="mychannel"

installChaincode 0 1
installChaincode 1 1
 
installChaincode 0 2
installChaincode 1 2

upgradeChaincode 0 1 $CC_VERSION

queryChaincode 0 1
queryChaincode 1 1
queryChaincode 0 2
queryChaincode 1 2