# KN06 Kubernetes II

## A. Begriffe und Konzepte erlernen

### Difference between Pods and Replicas

**Pods:** A Pod is the smallest deployable unit in Kubernetes, encapsulating one or more containers that share resources like networking and storage. Pods are ephemeral, meaning they can be recreated or moved as needed by Kubernetes.

**Replicas:** A replica is an exact copy of a Pod. Replicas are created to ensure that a specific number of Pods are always running, providing fault tolerance and scalability. If a Pod crashes or is deleted, a new replica will automatically be created.

### Difference between Service and Deployment

**Service:** A Service provides a stable interface to access a group of Pods. It abstracts the underlying Pods and offers a stable IP address or DNS name for access, regardless of the lifespan of individual Pods.

**Deployment:** A Deployment acts as a blueprint that defines how many copies of a specific Pod (replicas) should be deployed. It ensures smooth operation and updates for the Pods, offering features like rollbacks and rollouts.

### Problem Solved by Ingress

**Ingress** enables applications within a Kubernetes cluster to be accessed externally in a user-friendly manner. It provides routing rules for HTTP and HTTPS requests. Ingress allows you to use a user-friendly URL or domain name to access an application instead of knowing the specific IP addresses or ports of individual services.

### StatefulSet: Purpose and Example

**StatefulSet** ensures the management of Pods that require a stable state. It ensures that Pods have consistent, predictable names and stable storage allocations. StatefulSets are particularly useful for stateful applications that need to persist data over time. An example use case would be a messaging system that requires stable ID assignments for each process and must ensure no messages are lost if a Pod is restarted. <br>

## B. Demo Projekt

#### 1. Sie haben einen Teil der Services nicht so umgesetzt wie in den Begrifflichkeiten/im Tutorial erklärt. Begründen Sie welcher Teil das ist und wieso? (Tipp: es geht um die Datenbank) <br>

#### 2. 


#### 3. 


#### 4. 


#### 5. 


#### 6. 


#### 7.