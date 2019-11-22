#!/bin/sh

if [ "$NODE_ENV" == "production" ] ;
then
    npm run production
elif [ "$NODE_ENV" == "staging" ] ;
then
    npm run staging
else
    npm run dev
fi