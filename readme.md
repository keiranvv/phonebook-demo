# Phone Book Demo Application

## Technologies used

- .Net Core 3.1
- Entity Framework
- SQLite
- ReactJS

## Pre-requisites

- .Net Core SDK 3.1: https://dotnet.microsoft.com/download

## Installation

### Restore packages
``` bash
dotnet restore
```

### Create database

This project uses a local sqlite database for portability's sake. Run the below command to generate the .db file:

```
dotnet ef database update
```

## Run the application
``` bash
dotnet run
```

Once the application is running, browse to http://localhost:5000