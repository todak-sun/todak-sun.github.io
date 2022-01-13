---
title: Verdaccio로 Private NPM Repository 만들어보기
created: 2022-01-10
tags:
  - privatenpmrepository
  - verdaccio
---

# 들어가며

타입스크립트를 사용하게 되면서, 공통코드의 영역이 더 늘어났다.
예를 들자면
- Application간 통신에서 사용하는 Response/Request 모델 정의
- Producer, Consumer 에서의 메시지 모델 정의
등이 그렇다.

이러한 코드를 따로 패키징해 공통으로 사용하게 되면 생각보다  
많은 시간을 절약할 수 있다.

하지만, 특정 모델 스키마의 경우 public repository에 관리하기 다소 부담스러운 부분이 있기에, 사내에서 private repository를 만들어 관리하면 어떨까 하는 생각에 찾아보다가 Verdaccio라는 도구를 찾게 되었다.

## 도커를 이용한 Verdaccio 설치
필자는, Verdaccio를 어디든지 쉽게 배포 및 사용하기 위해
도커를 활용하였다.

Dockerhub에 Verdaccio에서 제공하는 공식 이미지가 존재하나,
공부할 겸, node image를 base로 하여 도커 파일을 작성해봤다.

```Dockerfile
# node 16.13 버전 이미지 사용
FROM node:16.13

# verdaccio를 global로 설치
RUN npm i -g verdaccio

# verdaccio의 repository와, web-ui를 활용하기 위해 4873 포트 노출
EXPOSE 4873

# 컨테이너가 실행되는 동시에 실행할 명령어.
ENTRYPOINT verdaccio
```

위와 같이 Dockerfile을 명세한 후, 빌드해보자.

```bash
# docker build -t <imagename>:<tag> <build context>
$ docker build -t npm-repo:test .
```
별다른 문제가 없다면, 문제없이 이미지 빌드가 끝났을 것이다.
이제 실행해보자.

```bash
# docker run --name <container name> -d(background 실행) -p <host port>:<container port>(container port를 host의 특정 port로 forwarding) <imagename>:<tag>
$ docker run --name npm-repo -d -p 4873:4873 npm-repo:test
```
실행에도 아무런 문제가 없다면
브라우저를 실행해 http://localhost:4873 을 통해 verdaccio 화면을 만나보자.
그런데, 접속이 안된다.

*** 필자가 본 게시물을 작성할 당시에 사용한 verdaccio의 버전은 5.4.0이므로, 향후 버전 업그레이드가 될 시 아래의 방법으로 해결이 안될 수 있다.

`docker ps` 명령어를 통해 확인해도, 도커 컨테이너는 제대로 실행 중이고
포트 포워딩도 의도하였던데로 host의 4873으로 바인딩이 잘 되어있는데도 말이다.
그럼, verdaccio가 제대로 실행되지 않은 것일까?

도커 컨테이너에 직접 붙어 원인을 파악해보았다.

```bash
# docker run -it <container name or container id> <container 내에서 실행할 명령어>
$ docker exec -it npm-repo sh

$container curl -X GET http:localhost:4873
```
위의 명령어를 차례대로 실행해보면, 응답으로 html이 오는 것을 확인할 수 있다.

무엇이 잘못된걸까?
원인은, verdaccio의 config.yaml 내 `listen`에 설정된 default 값이 `localhost:4873`이기 때문이다.











