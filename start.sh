#!/bin/bash
(cd backend &&
npm install &&
npm start) &
(cd gateway &&
npm install &&
npm start) &
(cd frontend &&
npm install &&
npm start) &&
fg