# library

war-приложение. 
 - Есть каталоги в библиотеке - закрытый и публичный.
 - И есть книги, находящиеся в закрытом или публичном каталоге.
 - У каждой книги есть название, автор и дата выхода.
 - В приложении должен быть EJB-сервис, который умеет отдавать данные,
   сохранять данные, перемещать книги из одного каталога в другой и удалять их совсем.
 -  Базу не надо, сохранение идёт в память. Нужен REST-контроллер,
   который выдаёт/принимает данные как JSON и одна страничка html+jquery которая показывает
   и даёт редактировать поля: название, автор, дата выхода, а также кнопки для перемещения
   данных из каталога в каталог, сохранения и удаления. 
 - К дате выхода книги на страничке
 прицепить календарь.

Web-приложение должно запускаться на jboss 7.x или на wildfly 8.x. Java 7.


### Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.

Download and extract the [latest pre-built release](https://github.com/meinou/library).

Install the dependencies and devDependencies and start the server.

in pom-xml change port number where web interface of the server can be found

```
<port>9991</port>
```

Run backend

```
>cd \lib\
>mvn package wildfly:undeploy | mvn package wildfly:deploy
```


Run front-end
```sh
>cd \lib\src\main\webapp
> npm install -d
> gulp
```

By default frontend will start at 3000 port.




   [dill]: <https://github.com/joemccann/dillinger>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [node.js]: <http://nodejs.org>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [Gulp]: <http://gulpjs.com>
   [dill]:<http://dillinger.io/>

