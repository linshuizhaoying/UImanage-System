#!/bin/sh
bash -c echo -e 'NOpass123\n\n' ;sudo -S redis-server
bash -c echo -e 'NOpass123\n\n' ;sudo -S mongod
bash -c echo -e 'NOpass123\n\n' ;sudo -S webpack -w

