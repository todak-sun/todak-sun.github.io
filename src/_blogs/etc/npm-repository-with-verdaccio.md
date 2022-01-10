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

## Verdaccio 설치

Verdaccio는 npm 명령어로 간단하게 설치할 수 있다.

```bash
  npm install -g verdaccio
```

verdaccio를 위와 같이 설치한 후 아래와 같은 명령어를 입력해보자! 

```bash
verdaccio
```

브라우저를 통해 `localhost:4873` 에 접근하면 verdaccio admin 페이지를 만날 수 있다.




