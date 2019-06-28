docker-compose -f docker-compose.yaml up -d
docker stop explorerdb

echo "Allow connections from anywhere."
sed -i -e "s/^#listen_addresses =.*$/listen_addresses = '*'/" ./postgres-data/postgresql.conf
echo "host    all    all    0.0.0.0/0    md5" >> ./postgres-data/pg_hba.conf

docker start explorerdb
