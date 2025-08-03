# Gator
Simple blog aggregator in JS

## Requirements
- Node v22.18
- Posgres

## Installation
```
$ git clone https://github.com/Asfolny/boot-dev-gator-js.git
$ cd boot-dev-gator-js
$ psql -c "CREATE DATABASE gator;"
```

## Config
To use gator, you must first create a `.gatorconfig.json` within your home directory with the following minimal config (url needs tweaking to work with your configuration of postgres)
```json
{
    "db_url": "postgres://<user>:<password>@localhost:5432/gator?sslmode=disable"
}
```

