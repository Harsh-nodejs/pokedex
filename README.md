 # PokeDex Prototype

## Introduction
The PokeDex prototype is a simple Node.js application that allows users to view and search for Pokemon. The application uses a MongoDB database to store Pokemon data, and the Express framework to handle HTTP requests.

## Installation

To install the PokeDex prototype, you will need to have Node.js and npm installed on your system. Once you have installed Node.js and npm, you can clone the PokeDex prototype repository from GitHub:

```
git clone https://github.com/harshparashar/pokedex-prototype.git
```

Once you have cloned the repository, you can install the project's dependencies by running the following command in the project's root directory:

```
npm install
```

## Configuration

The PokeDex prototype uses a `.env` file to store environment variables. You will need to create a `.env` file in the project's root directory and add the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/pokedex
```

The `MONGODB_URI` environment variable specifies the connection string to the MongoDB database. You will need to replace the `localhost` and `27017` values with the hostname and port of your MongoDB server.

## Running the Application

To run the PokeDex prototype, you can use the following command in the project's root directory:

```
npm start
```

This command will start the Node.js application and listen for HTTP requests on port 3000.

## Usage

The PokeDex prototype provides a simple REST API that allows users to view and search for Pokemon. The following table lists the available API endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/api/v1/pokeDex` | GET | Retrieves all Pokemon |
| `/api/v1/pokeDex/:id` | GET | Retrieves a single Pokemon by ID or name |
| `/api/v1/pokeDex/generation/` | POST | Searches for Pokemon by Generation |
| `/api/v1/pokeDex/generation/:genID` | POST | Searches for Pokemon by generation number |

To use the API, you can send HTTP requests to the specified endpoints. For example, the following cURL command will retrieve all Pokemon:

```
curl http://localhost:3000/
```

The following cURL command will retrieve a single Pokemon by ID:

```
curl http://localhost:3000/api/v1/pokeDex/1
```

The following cURL command will search for Pokemon by name:

```
curl -X POST

Result in api format =>

>{
    "status": "success",
    "results": 1,
    "data": {
        "pokedex": [
            {
                "_id": "658bf9aa11d77f503a254578",
                "pokedex_number": 1,
                "pokemon_name": "Bulbasaur",
                "type_1": "Grass",
                "type_2": "Poison",
                "hit_points": 45,
                "attack": 49,
                "defense": 49,
                "special_attack": 65,
                "special_defense": 65,
                "speed": 45,
                "total_stats": 318,
                "generation": 1,
                "can_evolve": true,
                "final_evolution": false,
                "legendary": false,
                "mythical": false
            }
        ]
    }
}