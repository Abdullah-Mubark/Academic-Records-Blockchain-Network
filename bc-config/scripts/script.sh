#!/bin/bash

echo
echo " ____    _____      _      ____    _____ "
echo "/ ___|  |_   _|    / \    |  _ \  |_   _|"
echo "\___ \    | |     / _ \   | |_) |   | |  "
echo " ___) |   | |    / ___ \  |  _ <    | |  "
echo "|____/    |_|   /_/   \_\ |_| \_\   |_|  "
echo
echo "Build your first network (BYFN) end-to-end test"
echo
CHANNEL_NAME="$1"
DELAY="$2"
LANGUAGE="$3"
TIMEOUT="$4"
VERBOSE="$5"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${LANGUAGE:="node"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=10

CC_SRC_PATH="github.com/chaincode/checklist-template/"
if [ "$LANGUAGE" = "node" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/checklist-template/"
fi

if [ "$LANGUAGE" = "java" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/checklist-template/"
fi

CC_NAME="checklistcc"
CC_VERSION="1.07"

echo "Channel name : "$CHANNEL_NAME

# import utils
. scripts/utils.sh

createChannel() {
	setGlobals 0 1

	if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "false" ]; then
                set -x
		peer channel create -o orderer.ryadhinspections.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx >&log.txt
		res=$?
                set +x
	else
				set -x
		peer channel create -o orderer.ryadhinspections.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
		res=$?
				set +x
	fi
	cat log.txt
	verifyResult $res "Channel creation failed"
	echo "===================== Channel '$CHANNEL_NAME' created ===================== "
	echo
}

joinChannel () {
	for org in 1 2 3 4; do
	    for peer in 0 1; do
		joinChannelWithRetry $peer $org
		echo "===================== peer${peer}.org${org} joined channel '$CHANNEL_NAME' ===================== "
		sleep $DELAY
		echo
	    done
	done
}


## Join all the peers to the channel
echo "Having all peers join the channel..."
joinChannel

## Set the anchor peers for each org in the channel
echo "Updating anchor peers for rm..."
updateAnchorPeers 0 1
echo "Updating anchor peers for cd..."
updateAnchorPeers 0 2
echo "Updating anchor peers for sfda..."
updateAnchorPeers 0 3
echo "Updating anchor peers for reg1..."
updateAnchorPeers 0 4

## Install chaincode on peer0.rm and peer0.cd
echo "<<<<<< 1) -Start installing checklist template chaincode--->>>>>>>> "
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
 
 
 sleep 30
  
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
 
 
 
echo
echo "========= All GOOD, BYFN execution completed =========== "
echo

echo
echo " _____   _   _   ____   "
echo "| ____| | \ | | |  _ \  "
echo "|  _|   |  \| | | | | | "
echo "| |___  | |\  | | |_| | "
echo "|_____| |_| \_| |____/  "
echo

exit 0
