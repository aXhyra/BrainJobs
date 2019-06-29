#!/bin/bash
cd backend
npm install &
cd ../gateway
npm install &
cd ../frontend
npm install &&
exit 0