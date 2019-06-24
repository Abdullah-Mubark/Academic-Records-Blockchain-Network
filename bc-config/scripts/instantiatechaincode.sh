#!/bin/bash

# import utils
. scripts/utils.sh

# Variable setup
CHANNEL_NAME="mychannel"
LANGUAGE="node"
CC_VERSION="1.07"


CC_NAME="unifiedschemacc"
instantiateChaincode 1 1
sleep 2
CC_NAME="checklistcc"
instantiateChaincode 1 1
sleep 2
CC_NAME="processtemplatecc"
instantiateChaincode 1 1
sleep 2 
CC_NAME="processinstancecc"
instantiateChaincode 1 1


sleep 30
CC_NAME="unifiedschemacc"
queryChaincode 0 1
queryChaincode 0 2
queryChaincode 1 2
queryChaincode 0 3
queryChaincode 1 3
queryChaincode 0 4
queryChaincode 1 4

sleep 2

CC_NAME="checklistcc"
queryChaincode 0 1
queryChaincode 0 2
queryChaincode 1 2
queryChaincode 0 3
queryChaincode 1 3
queryChaincode 0 4
queryChaincode 1 4
sleep 2
CC_NAME="processtemplatecc"
queryChaincode 0 1
queryChaincode 0 2
queryChaincode 1 2
queryChaincode 0 3
queryChaincode 1 3
queryChaincode 0 4
queryChaincode 1 4
sleep 2 
CC_NAME="processinstancecc"
queryChaincode 0 1
queryChaincode 0 2
queryChaincode 1 2
queryChaincode 0 3
queryChaincode 1 3
queryChaincode 0 4
queryChaincode 1 4

