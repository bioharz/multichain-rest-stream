#!/bin/bash
export MULTICHAIN_HOST=localhost;
export MULTICHAIN_PORT=6310;
export MULTICHAIN_USER=multichainrpc;
export MULTICHAIN_PASS=Di8dNemGUAKNzXS7BcNuKBnFC8W3uAdbnetaM8xqjwkD;
while true
do
    node index.js
    sleep 5
done