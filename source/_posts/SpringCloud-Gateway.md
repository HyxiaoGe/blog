---
title: SpringCloud-Gateway
date: 2024-04-22 19:02:12
tags:
  - SpringCloud
  - Gateway
categories: 微服务
---

Gateway是Spring Cloud的一个组件，用于构建API网关。API网关是微服务架构中的一个关键组件，它负责**路由请求转发**、**负载均衡**、**断路器**、**安全**、**跨域**、**请求头**和**响应头的修改**等。

### 三大特性

- **Routes**：路由
- **Filters**：过滤器
- **Predicates**：断言

### 工作原理

- **路由**：客户端向 Spring Cloud Gateway 发出请求后，Gateway Handler Mapping 查找与请求相匹配的路由。

- 过滤器

  ：在请求达到实际服务之前，Gateway 可以使用过滤器来修改传入的 HTTP 请求；同理，返回的 HTTP 响应也可以被过滤器处理。

  - 有两种类型的过滤器，`pre 过滤器`和`post 过滤器`。pre 过滤器在路由请求之前执行，post 过滤器在路由请求之后执行。

- **转发**：最后请求将被转发到实际的服务。

### 使用场景

- **路由和负载均衡**：将请求路由到合适的微服务实例。
- **安全**：如身份验证和授权。
- **限流**：限制请求的速率。
- **缓存**：缓存请求的响应。
- **断路**：在某个微服务实例出现问题时，快速失败。
- **跨域**：处理跨域资源共享（CORS）请求。
- **请求和响应的修改**：如添加、删除或修改头信息。

### 作用

- **统一入口**：为微服务提供一个统一的访问入口，简化客户端调用。
- **安全防护**：提供安全机制，如身份验证、授权和防止恶意攻击。
- **性能优化**：如负载均衡、缓存和限流。
- **故障隔离**：如断路和重试。

### 定义路由规则

Gateway 使用一组路由规则来确定如何处理传入的 HTTP 请求。每条路由规则定义了一个**目标** URI 、一组**断言**和一组**过滤器**。当断言为真时，请求会被路由到目标 URI ，并在路由之前和之后应用过滤器。

在 application.yml 中：

```
spring:
  cloud:
    gateway:
      routes:
      ## 路由规则的唯一标识符
      - id: user-service
        uri: lb://user-service
        predicates:
        - Path=/user/**
        filters:
        - AddRequestHeader=X-Request-Foo, Bar
```

在 Spring Cloud Gateway 的路由定义中：

- **id**：这是路由的唯一标识符。它用于区分和标识不同的路由规则。在管理、监控或日志中，这个`id`可以帮助我们快速识别和引用特定的路由。

- uri

  ：这是路由的目标URI。当

  请求满足某个路由的断言时，它会被转发到这个URI

  。这个

  ```
  URI
  ```

  可以是一个具体的地址，也可以是一个服务的逻辑名称。

  - 当URI的前缀是 `lb://{{微服务名称}}` 时，表示这是一个逻辑地址，需要使用客户端负载均衡器（如 Ribbon）来解析。在这个例子中，`lb://user-service` 表示请求会被负载均衡到名为 `user-service` 的服务实例。
  - 如果 URI 是一个 HTTP 或 HTTPS 地址，lb://https://www.baidu.com，那么请求会被直接转发到这个地

- predicates 路由谓词

  ：

  - 谓词用于匹配和过滤HTTP请求。

  - SpringCloud Gateway 提供了多种内置谓词，如：

    - Path

      ：根据请求路径匹配。

      - **Method**：根据HTTP方法匹配。
      - **Header**：根据请求头匹配。
      - **Query**：根据查询参数匹配。

- filters 过滤器

  ：

  - Gateway 提供了多种过滤器，这些过滤器分为全局过滤器和路由过滤器。全局过滤器对所有请求都有效，而路由过滤器只对特定的路由有效。
  - 过滤器的执行顺序是由其 order 属性决定的。请求首先会经过所有的 pre 类型的过滤器，然后路由到下游服务，最后再经过所有的 post 类型的过滤器。

上述配置定义了一个路由规则，当请求的路径匹配 `/user/**` 断言时，它会被路由到名为 `user-service` 的微服务，并在请求头中添加一个名为 X-Request-Foo 的头信息。

### 定义过滤器

```java
@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("path_route", r -> r.path("/get")
            .filters(f -> f.addRequestHeader("Hello", "World"))
            .uri("<http://httpbin.org>"))
        .build();
}
```

上述代码定义了一个路由规则，当请求的路径为 /get 时，它会被路由到 http://httpbin.org/get ，并在请求头中添加一个名为 Hello 的头信息。

### SpringCloud Gateway的应用

### 1. 动态路由

- Gateway 支持动态路由，允许您在运行时添加、修改或删除路由规则。
- 这是通过与Spring Cloud Config 或其他外部配置源的集成来实现的。
- 当路由配置发生变化时，Gateway 可以自动刷新路由规则，而无需重新启动应用。

### 2. API聚合

网关可以用来聚合多个后端服务的API调用结果。例如，客户端可以只发送一个请求到网关，网关则分别向多个服务发请求，然后将结果聚合后返回给客户端。这可以减少客户端与服务间的通信次数，并简化客户端逻辑。

### 3. 全局过滤器

除了标准的路由过滤器外，Spring Cloud Gateway 还提供全局过滤器，它对所有的路由有效。这些全局过滤器可以用来实现跨服务的逻辑，如权限校验、日志跟踪记录、安全检查等。

### 4. 断路器集成

- Spring Cloud GateWay 支持与 Hystrix 断路器的集成。当某个下游服务出现问题时，断路器可以防止请求继续传递给服务，从而防止系统雪崩。
- 通过配置，你可以为特定的路由定义断路器的行为，例如失败的阈值和回退的响应。

### 5. 重试机制

- 如果某个微服务实例失败，Gateway 可以配置为自动重试其他实例。
- 重试可以基于不同的策略，如固定延迟、指数退避等。
- 这增加了系统的弹性和可用性。

### 6. 请求速率限制

通过与Redis等技术的集成，Spring Cloud Gateway 支持对客户端请求进行速率限制，这有助于防止API滥用并保护后端服务免受过载。

- 例如，你可以为特定的用户或IP设置每秒的请求限制。
- 限流可以帮助您保护系统免受恶意攻击和意外的流量峰值。

### 7. 集成与第三方服务发现

- Gateway 可以与Eureka、Consul、Zookeeper等服务发现组件集成。
- 当使用 `lb://{{微服务名称}}` 前缀的逻辑地址时，Gateway 会从服务发现组件中自动获取可用的服务实例，并进行负载均衡。

## 关于底层的负载均衡器

在Spring Cloud的较早版本中，**Ribbon**是默认的客户端负载均衡器。但从Spring Cloud Greenwich版本开始，官方推荐使用**Spring Cloud LoadBalancer**，这是一个基于Spring Reactor的新的轻量级、反应式负载均衡器。

Spring Cloud LoadBalancer的特点：

- 它是一个反应式的负载均衡器，并且完全集成在WebFlux环境中。
- 提供了一个简单的轮询和随机负载均衡策略的默认实现，也支持自定义策略。
- 它使用了Spring Boot 2.x中引入的HttpClient或WebClient来进行实际的服务调用。

虽然Ribbon项目现在处于维护模式，不再建议用于新的项目，但现有项目可以继续使用Ribbon而无需迁移到Spring Cloud LoadBalancer。

在实际的Spring Cloud项目中，你应该确保使用的是兼容的Spring Cloud版本，并且对应地选择使用Ribbon还是Spring Cloud LoadBalancer。如果你的Spring Cloud版本较新（比如Hoxton版本及以后），应该使用Spring Cloud LoadBalancer作为客户端负载均衡器。

总的来说，SpringCloud Gateway 是一个功能强大的API网关，它提供了一系列的工具和特性，使得开发者可以轻松地构建和管理微服务应用的API网关。