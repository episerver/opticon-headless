# Opticon Headless

## What is this project about?

This project is a sample consuming CMS and Customized Commerce headless APIs.

## Prerequisites

- [.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [NodeJS equal or greater than v16.10.0](https://nodejs.org/download/release/v16.10.0/)
- [yarn](https://yarnpkg.com)
- [Optimzely Commerce B2C equal or greater than 14](https://world.optimizely.com/products/#b2c)

## How it works

- Backend: an ASP.NET server side where Optimizely CMS and Customized Commerce headless APIs installed.
- Frontend: a React app client side to consume APIs from the backend.

## Getting Started

### Step 1: Set up back end project

In the backend project, go to appsettings.json, find the "ConnectionStrings" section, then update the connection strings by replacing CHANGE_ME by your preferred database names.
Fill in your SQL Server's admin user and password.

```json
"ConnectionStrings": {
    "EPiServerDB": "Server=.;Database=CHANGE_ME;User Id=your_user;Password=your_password;TrustServerCertificate=True",
    "EcfSqlConnection": "Server=.;Database=CHANGE_ME;User Id=your_user;Password=your_password;TrustServerCertificate=True"
  }
```

Also in this file, find the "Find" section, go to https://find.episerver.com/ to register and get a demo index then add it to this section.

```json
"Find": {
      "DefaultIndex": "CHANGE_ME",
      "ServiceUrl": "CHANGE_ME"
    },
```

Then run the site, the first time the site will ask to create an administration user. When an not found page shows up, go to http://localhost:5000/episerver/cms and log in.

### Step 2: Seed content types

In the front-end folder, run

```
yarn run content-definitions:push
```

to import content types from manifest.json.

### Step 3: Seed data

Next, run

```
yarn run seed
```

to seed content data.

## License

Distributed under the MIT License.
