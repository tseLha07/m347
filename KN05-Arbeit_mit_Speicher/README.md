# KN05 - Arbeit mit Speicher

## A. Bind mounts (40%)

#### 1. Liste der Befehle, die notwendig waren und der Screencas, der den beschriebenen Prozess zeigt: 
1. erstellt und betreibt einen Docker-Container mit nginx-Image und bind mount <br>
`docker run --name kn05a -p 8080:80 -v C:/GitHubRepositories/m347/KN05-Arbeit_mit_Speicher/KN05a/:/usr/share/nginx/html/kn05a -d nginx` <br>
![](images/1.png) <br>

2. Kopiert das Bash-Skript "output.sh" vom Hostsystem in den Container <br>
`docker cp output.sh 4cd184cd65ae:/usr/share/nginx/html/kn05a/output.sh` <br>
![](images/2.png) <br>

3. Zugriff auf die Container-Shell über das Terminal <br>
`docker exec -it 4cd184cd65ae /bin/bash` <br>
4. Verzeichnis wechseln, in dem sich das Skript befindet <br>
`cd /usr/share/nginx/html/kn05a` <br>
5. Ausführen des Skripts <br>
`bash output.sh` <br>
![](images/3.png) <br>


## B. Volumes (30%)

#### 1. Liste der Befehle, die notwendig waren und der Screencas, der den beschriebenen Prozess zeigt:
1. Ein Volume erstellt: <br>
`docker volume create kn05-b_shared_volume` <br>
![](images/4.png) <br>

2. Erstellung und Ausführung von zwei Containern. Mit dem Flag --mount wird das zuvor erstellte Volume in jeden Container gemountet: <br>
`docker run -d --name kn05b-container-1 --mount source=kn05-b_shared_volume,target=/shared nginx` <br>
` docker run -d --name kn05b-container-2 --mount source=kn05-b_shared_volume,target=/shared nginx` <br>
![](images/5.png) <br>


3. Die Konsole des ersten Containers wird geöffnet, um eine .txt-Datei zu erstellen und einige Inhalte in die Shared File zu schreiben. <br>
`docker exec -it kn05b-container-1 /bin/bash` <br>
`echo "Content from container1" >> /shared/shared_file.txt` <br>
Die Konsole des zweiten Containers wird geöffnet, um den Inhalt der gleichen Datei zu lesen. <br>
`docker exec -it kn05b-container-2 /bin/bash` <br>
`cat /shared/shared_file.txt` <br>
![](images/6.png) <br>


## C. Speicher mit docker compose (30%)

#### 1. Auszug mit dem Befehl mount im ersten Container, der zeigt, dass alle drei Speichertypen hinzugefügt wurden.
![](images/7.png) <br>

#### 2. Auszug mit dem Befehl mount im zweiten Container, der zeigt, dass der Speichertyp hinzugefügt wurde.
![](images/8.png) <br>

![](images/9.png) <br>

