## Prepare Environment
```
Below recommendations are for Centos with yum as package manager , search for alternative commands for related OS
```
###### Update package manager run below command
```
sudo yum update
```

###### Install Git, run below command
```
sudo yum install -y git
```

###### Install node, run below commands
```
curl -sL https://rpm.nodesource.com/setup_8.x | sudo bash -

sudo yum install nodejs
```

###### Install Docker, run below commands
```
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine

sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install docker-ce

sudo systemctl start docker
```

###### Install Docker Compose, run below commands
Sometime links are broken , you need to visit the link (https://github.com/docker/compose/releases) to get required release
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose                        

sudo yum install build-essential
```

###### Fabric Essentials
Though fabric images are fixed in compose files , it is always good to pull required images first before running network up commands
```
For quick setup run bootstrap.sh script , it will load all related images , if you want to do with simple command, use below commands

curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.0

sudo yum install gcc-c++ make
```

## Build Crypto Material
Cypto material is added with this project , in order to get fresh cryptos run below command, and make sure you replace CA keys in docker-compose file 'docker-compose-e2e.yaml' in this case, incorrect mapping will result in error. There is a function 'replacePrivateKey' in byfn.sh script which can automate replace keys , if needed that can be reused with few customization.
```
Run following shell script

./create-crypto.sh
```

## Build Network
Before running network script, there are required host machine configurations mentioned below, follow the steps as below
```
Open all tcp/UDP ports:
firewall-cmd --permanent --add-port=0-65535/tcp
firewall-cmd --permanent --add-port=0-65535/udp
systemctl stop firewalld
systemctl start firewalld


Create initial folder structure on each host machines:
 mkdir blockchain
 cd blockchain
 mkdir network

cd to /rm-bc-config

1- Clone rm-bc-config repository
    git clone https://{your_name}:{your_token}@github.ibm.com/RMInspectionBlockchain/rm-bc-config.git
2- Clone rm-bc-chaincode repository
    git clone https://{your_name}:{your_token}@github.ibm.com/RMInspectionBlockchain/rm-bc-chaincode.git
3- Copy all content of above into rm-bc-config/chaincode directory

grant execute permission to the scripts:
chmod +x byfn.sh
chmod +x main.sh
chmod +x bin/*
chmod +x scripts/*

On master node, run:
	docker swarm init

This will generate a command for joining the swarm as a worker node. Run this command on all worker nodes to join the swarm.

    An example of the generated command is as follows e.g:
    docker swarm join \        --token SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-1awxwuwd3z9j1z3puu7rcgdbx \        172.17.0.2:2377


finally on the master run this:

run buildnetwork.sh script to build nework 
```

## Create Channel
```
Change create-channel.sh and scripts/createchannel.sh files if required
before running below shell script

Variables that need to changes are e.g:
CHANNEL_NAME="mychannel"

./create-channel.sh
```

## Join Channel
```
Change join-channel.sh and scripts/joinchannel.sh files if required before running below shell script
./join-channel.sh
```

## Install Chaincode
```
Change install-chaincode.sh and scripts/installchaincode.sh files if required 
before running below shell script

Variables that need to changes are e.g:
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/checklist-template/"
CC_NAME="checklistcc"
CC_VERSION="1.10"

./install-chaincode.sh
```

## Instantiate Chaincode
```
Change instantiate-chaincode.sh and scripts/instantiatechaincode.sh files if required 
before running below shell script

Variables that need to changes are e.g:
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/checklist-template/"
CC_NAME="checklistcc"
CC_VERSION="1.10"

./instantiate-chaincode.sh
```

## Run everything with one script
```
You can run ./main.sh command to perform below actions
- build network
- create channel
- join peers to channel
- install chaincode
- instantiate chaincode
```

## Upgrade Chaincode
```
Change upgrade-chaincode.sh and scripts/upgradechaincode.sh files if required before 
running below shell script

Variables that need to changes are e.g:
CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/checklist-template/"
CC_NAME="checklistcc"
CC_VERSION="1.10"

./upgrade-chaincode.sh
```


## Add new org to network
```
Add new org to the network are same steps are done for building network for the first time expect it will be done for one organization , include following steps to be performed
1- Create Org crypto, config and network compose YAML files
2- Create crypto for the organization
3- Prepare the environment
4- Join docker sward manager node
5- Up the network using compose file
6- Join the channel
7- Install chaincode
8- Instantiate if it is a new chaincode else query existing chaincode

a complere official documentation and steps can be found on following link
https://hyperledger-fabric.readthedocs.io/en/release-1.3/channel_update_tutorial.html
```