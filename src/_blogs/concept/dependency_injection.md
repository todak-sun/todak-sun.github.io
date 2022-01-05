---
title: 의존성 주입(Dependency Injection)이란?
created: 2022-01-05
tags:
  - 의존성주입
  - 의존성
  - Dependency
---

# 들어가며

개발을 하다보면 심심치않게 자주 맞닥들이는 표현 중 하나가 바로 이 의존성 주입이다.
의존성 주입에 대해 설명하는 글은 많으나,
필자의 생각도 정리해볼 겸, 본 게시물을 작성해본다.


## 의존성 + 주입

의존성 주입을 문자 그대로 쪼개보면 의존성(Dependency), 주입(Injection)이다.
의존성을 주입에 대해 말하기 전, 이 각각의 표현부터 정리해보자.

## 의존성(Dependency)

의존성은 '주체'가 '어떤 수단'을 이용해 행동을 할 때
생겨나는 두 사이의 관계를 의존성이라고 볼 수 있다.

실 생활에서의 간단한 예를 들어보자.
누군가 파스타를 먹기 위해 포크를 사용한다면,
여기서의 '누군가'는 포크에 의존하여 식사를 한다고 볼 수 있다.

이를 코드로 나타내면 아래와 같다.

```java
// Person.java
class Person {
  
  Fork fork;
  
  eatPasta(){
    this.fork.peek("pasta");
  }
}
```

```java
// Fork.java
class Fork {
  void peek(String food){
    System.out.println(food + "peek!");
  }
}
```
Person은 파스타를 먹는 행동(eatPasta())을 하기 위해, Fork를 사용하고 있다.
이때 Person은 Fork에 의존하고 있다고 볼 수 있다.

## 주입(Injection)

위의 설명에 기반하여 주입을 다시 정의해보자면
주입은 '주체'가 어떤 행동을 하기위해 '어떤 수단'을 사용할 수 있도록 돕는 방법 중 하나이다.

'누군가'가 파스타를 먹기 위해 '포크'를 필요로 한다면,
우리는 이 '포크'를 사용할 수 있도록 '누군가'에게 제공해야한다.
그리고 이러한 포크를 제공하는 방법은 여러가지가 있을 수 있다.

- 포크가 없어도 되는 누군가에게 포크를 필요로 할 때 쥐어줄 수 있다.
- 포크를 언제든 사용할 수 있도록 포크를 들고다니게 만들 수 있다.

코드를 통해서는 포크를 어떻게 쥐어줄 수 있을까?

```java
// Person.java
class Person {

  // 필드
  Fork fork;

  // 기본 생성자
  Person(){}

  // 생성자
  Person(Fork fork){
    this.fork = fork;
  }

  // setter
  void setFork(Fork fork){
    this.fork = fork;
  }

  void eatPasta(){
    this.fork.peek("pasta");
  }
}
```

Person의 코드를 위와 같이 약간 수정했다. 우리는 이제 Fork를 Person에게 쥐어줄 수 있다.

```java
// Main.java
public class Main {
  public static void main(String[] args) {
    // 1. setter를 사용해 fork를 제공
    Person setterPerson = new Person();
    person.setFork(new Fork());
    setterPerson.eatPasta();

    // 2. 생성자를 사용해 fork를 제공
    Person constructorPerson = new Person(new Fork());
    constructorPerson.eatPasta();
    constructorPerson.eatPasta();

    // 3. 필드를 통해 fork를 제공
    Person fieldPerson = new Person();
    fieldPerson.fork = new Fork();
    fieldPerson.eatPasta();
  }
}
```

위 코드에서 Person에게 Fork를 쥐어주는 세가지 방식은 모두 잘 작동한다.
세가지 모두 Fork를 '의존'하고 있는 Person에게 Fork를 '주입'해주었다.

## 의존성 주입!

어떻게 생각하면, Person은 파스타를 먹기 위해 포크를 무조건 사용하는 것처럼 보일지 모르겠다.
그렇다면, 불필요하게 위처럼 매번 주입할 것이 아니라 아래와 같이 사용하는 것이 더 편하지 않을까?

```java
// Person.java
class Person {
  
  Fork fork;
  
  Person(){
    this.fork = new Fork();
  }

  // ...생략
}
```

이렇게 된다면, Person이 인스턴스화 될 때 Fork를 가지고 있으니
불필요하게 코드를 작성하지 않아도 언제든 eatPasta()라는 행동을 편리하게 할 수 있다.

그런데, 파스타를 꼭 포크로 먹으란 법이 어딨는가?
어떤 사람은 파스타를 젓가락으로 먹게될수도 있지 않을까?

위와 같이 Person 타입의 객체가 생성되는 시점에 포크를 쥐게끔 한다면
우리는 파스타를 먹을 수 있는 다양한 방법을 제공할 수 없다.

하지만 의존성 주입을 활용한다면 아래와 같이 Person이 사용하는 '식기도구'를 편하게 제공할 수 있다.

```java
// Tableware.java
interface Tableware {
  void peek(String food);
}

// Fork.java
class Fork implements Tableware {
  @Override
  public void peek(String food){ ... }
}

// Chopsticks.java
class Chopsticks implements Tableware {
  @Override
  public void peek(String food){ ... }
}

// Person.java
class Person {
  Tableware tableware;
  
  Person(Tableware tableware){
    this.tableware = tableware;
  }

  void eatPasta(){
    this.tableware.peek("pasta");
  }
}
```

위와 같이 코드를 약간 추가 & 수정을 하게 된다면,
우리는 사람이 파스타를 먹을 때 좀 더 다양한 도구를 편하게 제공할 수 있다.

```java
// Main.java
public class Main {
  
  public static void main(String[] args) {
    Person personUseFork = new Person(new Fork());
    personUseFork.eatPasta();

    Person personUseChopsticks = new Person(new Chopsticks());
    personUseChopsticks.eatPasta();
  }

}
```

위처럼 우리는 프로그램을 개발할 때 다양한 객체를 설계하고,
그 객체간의 의존관계를 맺어나가며 코드를 작성해나간다.

따라서, '의존성 주입'은 객체간의 의존관계가 있을 때, 그 객체간의 관계를 맺어주는 방법 중 하나라 표현할 수 있겠다.








