#!/bin/bash

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./nginx/ssl/seventech.key \
  -out ./nginx/ssl/seventech.crt \
  -config openssl.cnf \
  -extensions req_ext

sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain \
  ./nginx/ssl/seventech.crt