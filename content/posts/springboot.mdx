---
title: SpringBoot基础巩固
date: 2024-04-10 20:38:03
tags:
  - SpringBoot
categories: 微服务
---

## 约定大于配置、自动配置

### 约定大于配置

SpringBoot采用了**约定大于配置**的原则，这意味着如果你遵循某些默认的约定（例如，将数据库配置放在特定的位置），SpringBoot 会为你自动配置大部分的应用设置。这大大减少了配置的需求和可能出错的地方。

### **自动配置**

SpringBoot可以根据你的项目中的jar依赖自动配置你的应用。例如，如果你的项目中有**spring-boot-start-web**依赖，SpringBoot会认为你想创建一个Web应用，并自动为你配置 Tomcat 和 SpringMVC。

### **工作流程简述**

1. 应用启动时，

   ```
   @SpringBootApplication
   ```

   注解中的

   ```
   @EnableAutoConfiguration
   ```

   注解激活自动配置机制。

   1. SpringBootApplication 是一个组合注解，里面包含了 `@Configuration`、`@ComponentScan`、`@EnableAutoConfiguration`。

2. Spring Boot会读取所有`META-INF/spring.factories`文件，查找并加载所有指定的自动配置类。

3. 自动配置类会根据条件注解（如`@ConditionalOnClass`等）判断条件是否满足，决定是否执行相应的自动配置逻辑。

4. 自动配置类会被加载到Spring容器中，提供所需要的bean实例，完成自动配置。

### **SpringBoot 中常用的注解**

1. @SpringBootApplication

   ：复合注解，包括 @SpringBootConfiguration、@EnableAutoConfiguration 和 @ComponentScan。

   - 它标记一个类作为 SpringBoot 应用的主配置类。

2. @EnableAutoConfiguration

   ：告诉 SpringBoot 启动自动配置

   - 它会尝试根据添加的 jar 依赖自动配置应用。

3. @ConfigurationProperties

   ：用于配置文件中的属性绑定到一个 Java 对象

   - 例如，可以将 application.properties 或 application.yml 中的属性绑定到一个 Bean。

4. @ComponentScan

   ：Spring 会自动扫描指定包下的所有组件、配置类和服务。

   - 通常与 @SpringBootApplication 搭配使用

5. @Bean

   ：用于标记一个方法为 Bean 的生产者。

   - 该方法的返回值会被添加到 Spring 上下文中。

6. **@Value**：用于将配置文件中的一个属性值注入到Bean属性中。

7. @RestController

   ：是一个复合注解，它包括 @Controller 和 @ResponseBody。

   - 用于创建 RESTful Web 服务。

8. @RequestMapping

   ：用于定义 URL 映射和 HTTP 操作类型（如GET、POST）。

   - 可以在类或方法上使用。

9. **@GetMapping, @PostMapping, @PutMapping, @DeleteMapping**：这些是@RequestMapping的特定快捷方式，用于处理特定的HTTP操作。

10. @PathVariable

    ：用于从 URL 模板中提取值。

    - 例如，在 @GetMapping("/users/{id}") 中提取 id。

11. @RequestParam

    ：用于从请求参数中提取值。

    - 例如，在查询参数 ?name=value 中提取 name。

12. @Autowired

    ：用于自动注入 Bean。

    - Spring 会查找并注入匹配的 Bean。

13. @Service, @Repository, @Controller, @Component

    ：这些注解用于定义 Bean，并告诉 Spring 这些类是 Spring 组件。

    - Spring 会自动检测并注册这些组件。