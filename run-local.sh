#!/bin/bash

 npm run build && npm run buildsass && npm run buildjs && npm run buildgovuk && npm run buildlocalimages && node -r 'dotenv/config' dist/app.js
