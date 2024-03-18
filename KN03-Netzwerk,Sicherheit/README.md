# KN03 - Netzwerk, Sicherheit

### A. Eignenes Netzwerk (100%)
1. Screenshots der Befehle und deren Resultate. Achtung: Sie können Befehle zusammenfassen.

    - Zuerst erstelle ich das benutzerdefinierte Netzwerk "tbz", "bridge ist pre-defined": <br>
        `docker network create -d tbz` <br>
        ![](images/1.png) <br>

    - Dann habe ich die Container busybox1, busybox2, busybox3 und busybox4 mit dem nginx-Image erstellt und sie den entsprechenden Netzwerken zugewiesen: <br>
        `docker run --name busybox1 --network bridge -d nginx` <br>
        `docker run --name busybox2 --network bridge -d nginx` <br>
        `docker run --name busybox3 --network tbz -d nginx` <br>
        `docker run --name busybox4 --network tbz -d nginx` <br>
        ![](images/2.png) <br>

    - Anschließend installiere ich die Netzwerk-Tools in jedem Container: <br>
        `docker exec -it busybox1 apt-get update`, `docker exec -it busybox1 apt-get install net-tools iputils-ping` <br>
        `docker exec -it busybox2 apt-get update`, `docker exec -it busybox2 apt-get install net-tools iputils-ping` <br>
        `docker exec -it busybox3 apt-get update`, `docker exec -it busybox3 apt-get install net-tools iputils-ping` <br>
        `docker exec -it busybox4 apt-get update`, `docker exec -it busybox4 apt-get install net-tools iputils-ping` <br>
        ![](images/3.png) <br>
        ![](images/3.1.png) <br>

    - IP-Adressen von busybox1, busybox2, busybox3 und busybox4 erhalten: <br>
        ![](images/4.png) <br>
        busybox1: 172.17.0.2 <br>
        busybox2: 172.17.0.3 <br>
        busybox3: 172.21.0.2 <br>
        busybox4: 172.21.0.3 <br>
    
    - TBZ network setting: <br>
        subnet: 172.21.0.0/16 <br>
        default gateway: 172.21.0.1 <br>
        ![](images/5.png)
    
    - bridge network settings: <br>
        subnet: 172.17.0.0/16 <br>
        default gateway: 172.17.0.1 <br>
        ![](images/6.png)

    - ***Interaktive Session auf busybox1 gestartet:*** <br>
        Default gateway: 172.17.0.1 <br>
        `docker exec -it busybox1 sh` <br>
        ![](images/7.png) <br>

    - ping busybox2 und ping busybox3: <br>
        ![](images/8.png) <br>

    - ping ip-von-busybox2 und ping ip-von-busybox3: <br>
        ![](images/9.png) <br>
    
    - ***Interaktive Session auf busybox3 gestartet:*** <br>
        Default gateway: 172.17.0.1 <br>
        `docker exec -it busybox1 sh` <br>

    - ping busybox1 und ping busybox4: <br>
        ![](images/10.png) <br>

    - ping ip-von-busybox1 und ping ip-von-busybox4: <br>
        ![](images/11.png) <br>

2. Erklären Sie die Gemeinsamkeiten und Unterschiede. Wie kommen die Zustande und was ist Ihre Schlussfolgerung. <br>

    <strong>Gemeinsamkeiten:</strong> <br>
    1. Beide Netze, das Standard-Bridge-Netz und das benutzerdefinierte "tbz"-Netz, ermöglichen die Kommunikation zwischen Containern, die in dasselbe Netzsegment (Subnetz) eingebunden sind.
    
    <strong>Unterschiede:</strong> <br>
    1. Der Unterschied besteht darin, dass die Container mit dem Standard-Bridge-Netzwerk nur teilweise verbunden sind, nämlich nur über die IP-Adresse, die sich im Laufe der Zeit ändern kann. Wenn ich jedoch mein eigenes Netzwerk erstelle, kann ich Containernamen verwenden, die sich im Laufe der Zeit nicht ändern.

3. Betrachten Sie nun KN02.
    In KN02, the containers in the same gateway could not communicate via the container name but with the (--link), the name is linked with the IP address, which enables the container to communicate.

    - In welchem Netzwerk befanden sich die beiden Container? <br>
      busybox1: bridge <br>
      busybox3: tbz <br>

    - Wieso konnten die miteinander reden? <br>
      The two containers that were located in the "tbz" network could talk to each other via their names or IP addresses because they were in the same network segment (subnet). Communication between containers in the same network is enabled by default and does not require any special configurations.
