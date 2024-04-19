# Steps to initialize this Node backend

**1) npm init -y** 

**2) npm i typescript -D**

**3) Create a tsconfig.json with following suitable options :**
```
  {
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "target": "ES2020",
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "."
   },
  "include": ["src/**/*"],

  }
  ```

**4) npm install -D ts-node nodemon**
  
**5) Create a nodemon.json with following suitable options :**
   ```
   {
    "watch": ["src"],
    "ext": "ts",
    "exec": "ts-node ./src/index.ts"
   }
   ```
   
**6) Add the following scripts in package.json :**

    ```
      "start": "tsc && node dist/app.js",
      "dev": "nodemon - exec 'ts-node' src/app.ts",
     ```
    
**7) Build something crazy!**

