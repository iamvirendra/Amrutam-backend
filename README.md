# Amrutam API

## Setup

 - Clone the repository :
  ```sh
  git clone git@gitlab.com:amrutam/amrutam-backend.git
  cd amrutam-backend
  ```

- Install dependencies :
  ```sh
  npm install
  ```

- Start the app (development) :
  ```sh
	npm run start
  ```

- Install PostgreSQL :
  ```sh
	brew install postgresql
	brew services start postgresql
  ```

- Create a Database :
  ```sh
	psql postgres
	CREATE DATABASE amrutam_db;
  ```

- Install Redis : 
  ```sh
	brew install redis
	brew services start redis
  ```

- Elasticsearch Setup: 
  ```sh
	brew tap elastic/tap
	brew install elastic/tap/elasticsearch
	brew services start elastic/tap/elasticsearch
  ```
  
- DB STRUCTURE:
  ```sh
  src/
	 ├── config.js                  
	 ├── db/
  	 |    ├── migrations/
	 │    ├── index.js              
	 │    ├── redis.js              
	 │    ├── elasticsearch.js      
	 ├── modules/
	 |    ├── auth/
	 |    ├── booking/
	 │    ├── consultations/
  	 │    ├── doctors/          
	 │    ├── prescriptions/        
	 │    ├── search/               
	 ├── middlewares/
	 │    └── auth.middleware.js    
	 ├── utils/
	 │    └── cache.util.js         
	 ├── app.js
     ├── config.js
     ├── server.js                  
	.env                            
	package.json
  ```

