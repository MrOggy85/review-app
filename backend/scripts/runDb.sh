#!/bin/bash

reldir=`dirname $0`
cd $reldir
directory=`pwd`
echo $directory

docker run \
  --name mysql-reviews \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -e MYSQL_DATABASE=review \
  -v $directory/../mysql_data:/var/lib/mysql \
  -p 3306:3306 \
  -d mysql:5.7.30
