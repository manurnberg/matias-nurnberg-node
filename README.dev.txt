
https://expressjs.com/es/advanced/best-practice-performance.html#try-catch
Backend
----------------------------------------------------------------------------------
npm init -y                                 //Create package.json
npm install express                         //BE Framework
npm install nodemon -D                      //Server Hot restart. (for dev only)
npm install morgan                          //Logger.
npm install sequelize                       //ORM 
npm install --save mysql2                   //mysql driver
npm install jest                            //test Framework   
npm install supertest                       //test Framework  
to remove dependencies: npm remove nodemon

RUN SERVER (wo/nodemon): node server/app.js
RUN SERVER (nodemon): npm run dev

