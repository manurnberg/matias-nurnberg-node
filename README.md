# CHALLENGE MATIAS NÜRNBERG 
Requerimos que desarrolles un proyecto (en node) que detecte si una persona tiene diferencias genéticas basándose en su secuencia de ADN. Para eso es necesario crear un servicio con un método o función con la siguiente firma (En JavaScript/Node JS):
 
Debe recibir como parámetro un array de Strings que representan cada fila de una tabla
de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las
cuales representa cada base nitrogenada del ADN. Debes validar que sólo puedas recibir bases nitrogenadas válidas.
 
Sin mutación:
 
A T G C G A
C A G T G C
T T A T T T
A G A C G G
G C G T C A
T C A C T G
 
Con mutación:
 
A T G C G A
C A G T G C
T T A T G T
A G A A G G
C C C C T A
T C A C T G
 
Sabrás si existe una mutación si se encuentra más de una secuencia de cuatro letras
iguales, de forma oblicua (diagonal), horizontal o vertical.

## EJECUTAR APP EN AMBIENTE DE PRODUCCION Y LOCAL
### AMBIENTE LOCAL / DESARROLLO
- RUN BACKEND SERVER port 3001 (sin nodemon): `node server/app.js`
- RUN BACKEND SERVER port 3001 (nodemon): `npm run dev` 

### AMBIENTE DE PRODUCCION (COMANDOS)
- START EN STAND ALONE : `sudo pm2 start src/index.js`
- CONFIGURA STARTUP AUTOMATICO AL REINICIAR SERVER: `sudo pm2 startup` (no me funciona)
- VER APPS INFO: `pm2 list` o `pm2 show 0` o `pm2 status` o `pm2 monit` 
- STOP INSTANCIA CON ID 0: `pm2 stop 0`
- PARA CREAR EL ARCHIVO DEFAULT DE ECOSYSTEM (ya se hizo para este proyecto): `pm2 ecosystem`
- VER LOGS DE TODAS LAS APPS: `pm2 logs` (tambien se podria ir al directorio de logs o poner el id de la instancia)
- `pm2 kill` para matar el pm2 y todas las instancias.

## A MEJORAR: 
- Deploy a prod: agregar ecosystem.config.js con la configuracion de la instancia para pm2 
- Se debe ampliar la cobertura de test

## INSTALACION DE SERVER DE PRODUCCION
- https://ourcodeworld.com/articles/read/977/how-to-deploy-a-node-js-application-on-aws-ec2-server

### SELECCION DE INSTANCIA EC2 en AWS (Creación de instancia)
- Seleccionar: Amazon Linux 2023
- Uso de links para crear PPK y abrir puertos necesarios.
  - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html#putty-private-key
  - https://aws.amazon.com/premiumsupport/knowledge-center/convert-pem-file-into-ppk/

### INSTALACION DE MYSQL EN AWS EC2 LINUX 2023
- https://medium.com/@chamikakasun/installing-mysql-in-an-ec2-instance-55d6a3e19caf
1. `sudo su`
2. `wget https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm`
3. `dnf install mysql80-community-release-el9-1.noarch.rpm -y`
4. `dnf install mysql-community-server -y`
4. `systemctl start mysqld` (para levantar la instancia)
5. `mysql -u root -p` (para conectarse y probar con el password creado anteriormente)
6. `select user, password, host from mysql.user;` (para ver salida de usuarios)
7. `GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your-password' WITH GRANT OPTION;` (para acceder a mysql desde afuera y darle privilegios para crear user y grants)
8. `FLUSH PRIVILEGES;`
9. _NOTA: recordá abrir los puertos necesarios si se quiere usar workbench o alguna herramienta asi._

### INSTALACION DE NODEJS EN AWS
- https://tecadmin.net/install-latest-nodejs-and-npm-on-centos/
1. `sudo yum install -y gcc-c++ make`
2. `sudo curl -sL https://rpm.nodesource.com/setup_18.x | sudo -E bash -`
3. `sudo yum install -y nodejs`
4. `nodejs -version`

### EJECUTAR PRUEBA RAPIDA EN AWS
1. Copiar proyecto a algun directorio del server o descargar de github, gitlab, etc.
2. `npm install` (instalar npm en el directorio donde esta el package.json)
3. `npm run dev` (corrida rapida en dev para probar que funcione el server)
4. probar que se encuentre funcionando algún WS (recorda abrir los puertos necesarios en la consola AWS)
5. `Ctrl+C` (apagar la instancia levantada)

### INSTALACION DE PM2 en AWS
1. `sudo npm install pm2 -g` (lo instala de forma global, para todos los proyectos).
2. para ver el resto de los comandos de pm2 ir a la ejecución en ambientes de producción.

### PRUEBA LOCAL
1. `git clone https://github.com/manurnberg/matias-nurnberg-node.git` (Clonar repositorio)
2. `git checkout matias_nurnberg` (Posicionarse en la rama matias_nurnberg).
3. npm install
4. npm run dev (nodemon).

### ENPOINTS LOCALES

1. prueba endpoint /mutation. (Resultado tiene mutation status code 200)

`curl --location --request POST 'http://localhost:3001/mutation' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CTACTA",
        "TCACTG"
        ]
}'
`

2. prueba endpoint /mutation. (Resultado no tiene mutation status code 403)

`curl --location --request POST 'http://localhost:3001/mutation' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dna": [
        "ATGCGA",
        "CTGTGC",
        "TTATGT",
        "AGAACG",
        "CCCTTA",
        "TCACTG"]
}'
`

3. prueba endpoint /stats. (resultado json {"count_mutations": ,"count_no_mutations": ,"ratio": ""})

`curl --location --request GET 'http://localhost:3001/stats'`

### PRUEBA EN SERVIDOR AWS

1. prueba endpoint /mutation. (Resultado tiene mutation status code 200)

`curl --location --request POST 'http://18.118.7.44:3001/mutation' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CTACTA",
        "TCACTG"
        ]
}'
`

2. prueba endpoint /mutation. (Resultado no tiene mutation status code 403)

`curl --location --request POST 'http://18.118.7.44:3001/mutation' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dna": [
        "ATGCGA",
        "CTGTGC",
        "TTATGT",
        "AGAACG",
        "CCCTTA",
        "TCACTG"]
}'`

3. prueba endpoint /stats. (resultado json {"count_mutations": ,"count_no_mutations": ,"ratio": ""})

`curl --location --request GET 'http://18.118.7.44:3001/stats'`

