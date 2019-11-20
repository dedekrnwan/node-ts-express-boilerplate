Core of Boilerplate Node.js Project (Typescript)
============================

> Structure folder of Core of Boilerplate Node.js Project (Typescript)

### A typical top-level directory layout

    .
    ├── config                  # Configuration folder ( proceed data configuration from .env )
    |   ├── development.json        # Your configuration file
    |   ├── staging.json            # Your configuration file
    |   ├── test.json               # Your configuration file
    |   └── production.json         # Your configuration file
    ├── src                     # Source files
    ├── dist                    # Compiled files 
    ├── docs                    # Documentation files 
    ├── tests                   # Automated tests 
    ├── .dockerignore           # Docker ignore file
    ├── env.example             # Example of env file
    ├── .eslintrc               # Eslint configuration file
    ├── .prettierrc             # Prettier configuration file
    ├── docker-compose.yml      # Docker Compose file to make development and production deployment easier
    ├── Dockerfile              # Dockerfile for this project
    ├── jest.config.js          # Jest configuration file
    ├── nodemon.json            # Nodemon configuration file
    ├── package.json            # You must know it
    ├── tsconfig.json           # Typescript configuration
    ├── LICENSE                 
    └── README.md               # Your reading this

<!-- > Use short lowercase names at least for the top-level files and folders except
> `LICENSE`, `README.md` -->


### config

Config folder of this project is in `confif` and file inside this folder is in `.json`

> config folder is for configuration file for app and named as environment like `development.json`, `staging.json` etc

    .
    ├── config                      # Configuration folder ( proceed data configuration from .env )
    |   ├── development.json        # Your configuration file
    |   ├── staging.json            # Your configuration file
    |   ├── test.json               # Your configuration file
    |   └── production.json         # Your configuration file
    └── ...


### dist

Source folder for compiled file 

> dist folder is for logical file like `modules`, `models` or `entity`, `helper`, `middleware`, and `services` same like `src` folder but this is for compiled code

    .
    ├── dist
    │   ├── controller              # Controller folder ( all controller is here )
    |       ├── **.controller.ts    # Controller file ( using `@dedekrnwan/decorators-express` modules to help you routing and call declaring middleware )
    |       └── index.ts            # Help you importing your controller only import the folder ( `import * as config from "./../controller"` )
    │   ├── helper                  # Helper folder ( all your custom function or class is here to help your development process )
    |       ├── **.helper.ts        # Your Helper file
    |       └── index.ts            # Help you importing your helper only import the folder ( `import * as config from "./../helper"` )
    │   ├── interfaces              # Interfaces folder ( interface file that you have make and you can use on another time in multiple logical function )
    |       ├── **.interface.ts     # Your Interface File
    |       └── index.ts            # Help you importing your interface only import the folder ( `import * as config from "./../interfaces"` )
    │   ├── middleware              # Middleware folder ( Middleware package or custom for express js )
    |       ├── **.middleware.ts    # Your Middleware File
    |       └── index.ts            # Sructure your middleware for position calling in `app.ts` and help you calling your middleware
    │   ├── services                # Services folder ( Service file help you to declaring third part or custom service like `Database` and etc )
    |       ├── **.service.ts       # Your Service File
    |       └── index.ts            # Help you importing your service only import the folder ( `import * as config from "./../service"` )
    │   └── utils                   # Utils ( Used for keep a project file environment like .key file )
    |       └── **.key              # .key file in this folder used for jwt secret key
    └── ...

    
### docker

Folder for docker configuration services

> This folder is used for everything docker need

    .
    ├── docker
    │   ├── services (sample)       # Controller folder ( all controller is here )
    |       ├── **.controller.ts    # Controller file ( using `@dedekrnwan/decorators-express` modules to help you routing and call declaring middleware )
    |       └── index.ts            # Help you importing your controller only import the folder ( `import * as config from "./../controller"` )
    │   ├── helper                  # Helper folder ( all your custom function or class is here to help your development process )
    |       ├── **.helper.ts        # Your Helper file
    |       └── index.ts            # Help you importing your helper only import the folder ( `import * as config from "./../helper"` )
    │   ├── interfaces              # Interfaces folder ( interface file that you have make and you can use on another time in multiple logical function )
    |       ├── **.interface.ts     # Your Interface File
    |       └── index.ts            # Help you importing your interface only import the folder ( `import * as config from "./../interfaces"` )
    │   ├── middleware              # Middleware folder ( Middleware package or custom for express js )
    |       ├── **.middleware.ts    # Your Middleware File
    |       └── index.ts            # Sructure your middleware for position calling in `app.ts` and help you calling your middleware
    │   ├── services                # Services folder ( Service file help you to declaring third part or custom service like `Database` and etc )
    |       ├── **.service.ts       # Your Service File
    |       └── index.ts            # Help you importing your service only import the folder ( `import * as config from "./../service"` )
    │   └── utils                   # Utils ( Used for keep a project file environment like .key file )
    |       └── **.key              # .key file in this folder used for jwt secret key
    └── ...


### Lib

Lib folder used for your Express Js setup 

> Lib folder is only `app.ts` and `server.ts`

    .
    ├── lib
    |   ├── app.ts                  # Setting app your express app in this file
    |   ├── kernel.ts               # Setting app your database and middlewares here
    │   └── server.ts               # Running express app

### Public

Public folder used for your open path or static path to save your `attachment` or `assets`

> Public folder has been called before in `app.ts` for static middleware

    .
    ├── public
    |   ├── attachment              # Attachment folder 
    │   └── assets                  # Your application asstes file


### Automated tests

Automated tests are usually placed into the `tests` or, less commonly, into the `spec` or `test` folder.

> **Q: Why tests are placed into a separate folder, as opposed to having them closer to the code under testS?**
>
> **A:** Because you don't want to test the code, you want to tests the *program*.

    .
    ├── ...
    ├── tests                   # Test folder (alternatively `spec` or `test`)
    │   ├── **.test.tsx         # Unit tests
    └── ...


