 # KN02-Dockerfile

 ### A. Dockerfile I
1. Dokumentiertes Dockerfile

    `FROM nginx` Basisimage für den Webserver, in diesem Fall nginx <br>
    `COPY static-html-directory /var/www/html` Kopiert den Inhalt des Verzeichnisses static-html-directory in das Verzeichnis /var/www/html im Container <br>
    `EXPOSE 80` Legt fest, dass der Container Port 80 nach aussen freigibt, um den Webserver zu erreichen <br>

2. Dockerfile, welches mit den entsprechenden Zeilen wie oben beschrieben:
[Dockerfile](A/dockerfile)

3. Notwendige Docker-Befehle für das build: <br>
`docker build -t kaama02/m347:kn02a .`

4. Befehl für den Start des Containers:<br>
`docker run -d -p 8080:80 kaama02/m347:kn02a` <br>

5. Befehle für dem push in das private Repository: <br>
`docker login`, <br>
`docker push kaama02/m347:kn02a`

6. Screenshot aus Docker Desktop, welcher das Image kn02a zeigt:
![](images/2.png) <br>

7. Screenshot der HTML-Seite, der die Seite helloworld.html zeigt, nachdem der Container gestartet wurde: <br>
![](images/1.png) <br>

 ### B. Dockerfile II

1. DB: telnet Befehl der zeigt, dass der Zugriff auf den DB Server funktioniert (Screenshot):
![](images/5.png) <br>

2. DB: Dockerfile für Ihren DB-Container: [Dockerfile](B/dockerfile-db)

3. DB: docker build und docker run Befehle für Ihren DB-Container: <br>
`docker build -t kn02b-db .` <br>
`docker run -d --name kn02b-db -p 3306:3306 kn02b-db`

4. Web: Screenshots der beiden Seiten info.php und db.php:
![](images/3.png) <br>
![](images/4.png)

5. Web: Dockerfile für Ihren Web-Container:
[Dockerfile](B/dockerfile-web)

6. Web: docker build und docker run Befehle für Ihren Web-Container: <br>
`docker build -t kn02b-web:latest -f dockerfile-web .` <br>
`docker run -d --name kn02b-web -p 80:80 --link kn02b-db:db kn02b-web`

7. Web: Angepasste PHP-Dateien: <br>
[info.php](B/info.php) <br>
[db.php](B/db.php)