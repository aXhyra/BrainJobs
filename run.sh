#!/bin/bash
cd backend
npm start &
cd ../gateway
npm start &
cd ../frontend
npm start &&
fg