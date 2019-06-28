Hyperledger Explorer
=======

Hyperledger Explorer is a simple, powerful, easy-to-use, highly maintainable, open source browser for viewing activity on the underlying blockchain network. Users have the ability to configure & build Hyperledger Explorer natively on macOS and Ubuntu.

## Directory Structure
```
├── app            	 Application backend root, Explorer configuration
	├── rest         REST API
	├── persistence  Persistence layer
		├── fabric   Persistence API (Hyperledger Fabric)
	├── platform     Platforms
		├── fabric   Explorer API (Hyperledger Fabric)
	├── test         Application backend test
├── client         	 Web UI
	├── public       Assets
	├── src          Front end source code
		├── components		React framework
		├── services	  	Request library for API calls
		├── state		Redux framework
		├── static       	Custom and Assets
```

## Requirements

Following are the software dependencies required to install and run hyperledger explorer
* nodejs 8.11.x (Note that v9.x is not yet supported)

curl -sL https://rpm.nodesource.com/setup_8.x | sudo -E bash -
sudo yum -y install nodejs
sudo yum -y install gcc-c++ make

* PostgreSQL 9.5 or greater (yum install -y postgresql.x86_64 for client and install server as docker container as per instructions in the rm-blockchain-explorer-config repository)
* Jq [https://stedolan.github.io/jq/]

chmod +x ./jq
cp jq /usr/bin

export PATH=$PATH:/root/bc1_2/bin

Hyperledger Explorer works with Hyperledger Fabric 1.4.  Install the following software dependencies to manage fabric network.
* docker 17.06.2-ce [https://www.docker.com/community-edition]
* docker-compose 1.14.0 [https://docs.docker.com/compose/]

<a name="Clone-Repository"/>

## Clone Repository

Clone this repository to get the latest using the following command.

## Database Setup

- `cd blockchain-explorer/app`
- Modify explorerconfig.json to update postgresql properties
	- postgreSQL host, port, database, username, password details.

- "postgreSQL": {
-		"host": "10.120.32.36",
-		"port": "5432",
-		"database": "fabricexplorer",
-		"username": "hppoc",
-		"passwd": "pass12345"
-	}


Another alternative to configure database properties is to use environment variables, example of setting:

- export DATABASE_HOST=10.120.32.36
- export DATABASE_PORT=5432
- export DATABASE_DATABASE=fabricexplorer
- export DATABASE_USERNAME=hppoc
- export DATABASE_PASSWD=pass12345

#Important repeat after every git pull (in some case you may need to apply permission to db/ directory, from blockchain-explorer/app/persistence/fabric/postgreSQL run: `chmod -R 775 db/` )

Modify /etc/hosts:

10.120.32.34    orderer.academicrecords.com
10.120.32.34    peer0.rm.academicrecords.com
10.120.32.34    peer1.rm.academicrecords.com
10.120.32.34    peer0.cd.academicrecords.com
10.120.32.34    peer1.cd.academicrecords.com
10.120.32.34    peer0.sfda.academicrecords.com
10.120.32.34    peer1.sfda.academicrecords.com
10.120.32.34    peer0.reg1.academicrecords.com
10.120.32.34    peer1.reg1.academicrecords.com

Run create database script.

- `cd blockchain-explorer/app/persistence/fabric/postgreSQL/db`
- `./createdb.sh`

If this doesn't work or fails then connect to the DB container and run the commands in explorerpg.sql file manually

#### Ubuntu

- `sudo -u postgres psql`

#### macOS

- `psql postgres`

- `\l` view created fabricexplorer database
- `\d` view created tables


## Fabric Configure Hyperledger Explorer

On another terminal.

- `cd rm-blockchain-explorer/app/platform/fabric`
- Modify config.json to update network-configs.
	- Change "fabric-path" to your fabric network path,
	example: "/home/user1/workspace/fabric-samples" for the following keys: "tlsCACerts", "adminPrivateKey", "signedCert".
	- Final path for key "tlsCACerts" will be:  "/home/user1/workspace/fabric-samples/first-network/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt".
- Modify "network-id.clients.client-id.channel" to your default channel for each client
- Sample configuration provided, see file: blockchain-explorer/app/platform/fabric/config-balance-transfer.json

### Configure to work with fabric-ca server

- `cd blockchain-explorer/app/platform/fabric`
- Modify config.json to add configurations related to CA server.
  - Add "certificateAuthorities" to 2 sections
    - The first one is for each organization to specify which CA server should be used
      - network-configs > network-1 > organizations > Org* > certificateAuthorities
    - The second one is for each network to access to CA  server
      - network-configs > network-1 > certificateAuthorities
    - Please refer [here](https://hyperledger-fabric.readthedocs.io/en/latest/developapps/connectionprofile.html#sample) about more detail
    - If leave certificateAuthorities of each organization empty, system will not use fabric-ca (it'll run with admin user)
- Modify config_ca.json to configure for your environment
  - Configure admin ID and credential to register a new user to CA server
  - Configure a user ID which is registered and enrolled as a user for managing blockchain explorer
  - Another alternative to configure them is to use environment variables, example of setting:
```
export ENROLL_ID="hlbeuser"
export ENROLL_AFFILIATION=".department1"
export ADMIN_USERNAME="admin"
export ADMIN_SECRET="adminpw"
```


## Build Hyperledger Explorer
**Important repeat after every git pull**

On another terminal.

- `cd rm-blockchain-explorer`
- `npm install`
- `cd rm-blockchain-explorer/app/test`
- `npm install`
- `npm run test`
- `cd client/`
- `npm install`
- `npm test -- -u --coverage`
- `npm run build`

<a name="Run-Hyperledger-Explorer"/>

## Run Hyperledger Explorer

- `cd rm-blockchain-explorer/app`
- Modify explorerconfig.json to update sync properties
	- sync type (local or host), platform, blocksSyncTime(in min) details.

Sync Process Configuration

- Please restart Explorer if any changes made to explorerconfig.json.

Host (Standalone)

- Ensure same configuration in Explorer explorerconfig.json if sync process is running from different locations

```json
 "sync": {
    "type": "host"
 }
```
Local (Run with Explorer)

```json
 "sync": {
    "type": "local"
 }
```

From new terminal.

- `cd blockchain-explorer/`
- `./start.sh`  (it will have the backend up).
- Launch the URL http://localhost:8080 on a browser.
- `./stop.sh`  (it will stop the node server).

From new terminal(If Sync Process in Standalone).

- `cd blockchain-explorer/`
- `./syncstart.sh` (it will have the sync node up). [Note : pass network-id and client-id to start specific client sync process, else first network and client will be considered]
- `./syncstop.sh`  (it will stop the sync node).

- If the Hyperledger Explorer was used previously in your browser be sure to clear the cache before relaunching.


## Hyperledger Explorer Swagger

- Once the Hyperledger Explorer has been launched go to http://localhost:8080/api-docs to view the Rust API description

<a name="Logs"/>

## Logs
- Please visit the [./logs/console]() folder to view the logs relating to console and [./logs/app]() to view the application logs and visit the [./logs/db]() to view the database logs.
- Logs rotate for every 7 days.

<a name="Troubleshooting"/>

## Troubleshooting

- Please visit the [TROUBLESHOOT.md](TROUBLESHOOT.md) to view the Troubleshooting TechNotes for Hyperledger Explorer.

<a name="License"/>

## License

Hyperledger Explorer Project source code is released under the Apache 2.0 license. The README.md, CONTRIBUTING.md files, and files in the "images", "__snapshots__" folders are licensed under the Creative Commons Attribution 4.0 International License. You may obtain a copy of the license, titled CC-BY-4.0, at http://creativecommons.org/licenses/by/4.0/.
