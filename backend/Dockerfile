FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY ./target/demo-0.0.1-SNAPSHOT.jar crudproduct.jar

ENTRYPOINT ["java","-jar","./crudproduct.jar"]

EXPOSE 8082
