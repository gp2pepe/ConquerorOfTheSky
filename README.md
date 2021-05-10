# ConquerorOfTheSky
 Juego de aviones de la primera guerra mundial realizado para proyecto de tercer año de Licenciatura en Informática:
 
 <a href="https://github.com/wanico34">@wanico34</a>  <br>
 <a href="https://github.com/mailzurdo">@mailzurdo </a><br>
 <a href="https://github.com/TabaRivas">@TabaRivas </a><br>
 <a href="https://github.com/IgnacioRama">@IgnacioRama </a><br>
 <a href="https://github.com/gp2pepe">@gp2pepe</a>


<h3>Build - Test</h3>

<h4>Requisitos base:</h4>

- Java 11 OpenJDK de RedHat  (https://developers.redhat.com/products/openjdk/download)
- Configuración de JAVA_HOME (https://www.thewindowsclub.com/set-java_home-in-windows-10)
- MySQL Community 8.0.23       (https://dev.mysql.com/downloads/installer/)
  - Crear base de datos ConquerorOfTheSky
  - Crear usuario y password, por ejemplo test, o guardar password de usuario root

<h4>Instalación para pruebas en Visual Studio Code:</h4>

<h5>Requisitos:</h5>

Visual Studio Code 1.53.2 (https://code.visualstudio.com/)<br>
Plugins: 
- Live Server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- Maven for Java (https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
- Spring Boot Dashboard (https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)
- Luego de instalados los plugins se debe reiniciar el programa

<h4>Pasos:</h4>

- Descomprimir .Zip
  - Abrir archivo: workspace.code-workspace
  - Modificar el archivo application.properties en src/main/resources/application.properties con los datos de la base:
```diff
spring.datasource.hikari.username=test
spring.datasource.hikari.password=test
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/ConquerorOfTheSky
```
- La línea :
```diff
#Para iniciar los datos y tablas create, una vez creados none 
spring.jpa.hibernate.ddl-auto=create
```
- Con la opción create genera las tablas y carga la tabla de configuraciones siempre que ejecuta el sistema, la opción en producción, una vez generada las estructuras, es none.

**Ejecutar los siguientes comandos:**
<br><br>
![1](https://user-images.githubusercontent.com/9892777/117591837-92781800-b10c-11eb-8515-cab735a714f7.png)
<br><br>
En la pestaña de Maven, sobre base, click derecho Clean, y luego click derecho en install, como pre-condición debe estar levantada la base de datos
<br><br>
**El resultado esperado es:**
<br><br>
![2](https://user-images.githubusercontent.com/9892777/117591857-acb1f600-b10c-11eb-895c-5879dfd270ad.png)
<br><br>
**Ahora se puede ejecutar el backend:**
<br><br>
![3](https://user-images.githubusercontent.com/9892777/117591859-ade32300-b10c-11eb-8c3d-3d68287fa415.png)
```diff
+ Que queda expuesto en el puerto 8082
```
**Para ejecutar el Frontend utilizamos el plugin “Live Server” que se encuentra debajo a la derecha:**
<br><br>
![4](https://user-images.githubusercontent.com/9892777/117591867-b3406d80-b10c-11eb-94e1-8fdb8bcabd90.png)
<br><br>
En este paso es posible nos pregunte qué carpeta del proyecto queremos ejecutar en el servidor, si es ese el caso elegimos ConquerorOfTheSkyClient
<br><br>
**Acto seguido nos debería abrir una pestaña en nuestro navegador por defecto con el juego corriendo en la url 127.0.0.1:5500:**
<br><br>
    ![5](https://user-images.githubusercontent.com/9892777/117591869-b4719a80-b10c-11eb-9a83-96ceaff2d025.png)
```diff   
+ Ya podemos realizar las pruebas sobre el sistema
```
