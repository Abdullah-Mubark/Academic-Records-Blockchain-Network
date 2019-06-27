#!/bin/bash

# Below is the seqence of shell scripts which need to run for complete setup
echo '+++++++++++++++ Scripts Starts ++++++++++'

./build-network.sh
sleep 30
./create-channel.sh
sleep 30
./join-channel.sh
sleep 30
./install-chaincode.sh
sleep 30
./instantiate-chaincode.sh
# sleep 30
# ./populate-network.sh

echo '+++++++++++++++ ALL GOOD ++++++++++'

