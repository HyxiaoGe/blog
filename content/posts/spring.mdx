---
title: Spring基础巩固
date: 2024-04-08 23:33:16
tags:
  - Spring
categories: 微服务
---

Spring 框架是 Java 开发中最流行的框架之一，它提供了全面的基础设施支持，使得开发者可以轻松构建企业级应用程序。

## IOC（Inversion of Control）

### 定义

IoC 即控制反转，是一种设计原则，它将应用程序的控制权从程序代码本身转移到外部容器或框架中。传统的程序设计中，程序内部直接控制程序流程和对象的创建与销毁，而在IoC中，对象的创建和管理由容器来完成，应用程序只需要描述组件之间的依赖关系，而不需要负责对象的创建和销毁。

### 作用

IoC 的主要作用在于降低了组件之间的耦合度，使得应用程序更加灵活、可扩展和易于维护。通过将对象的创建和管理交给容器，我们可以更容易地替换、扩展和重用组件，同时也能更好地实现面向接口编程。

### 实现原理

IoC的实现原理主要通过依赖注入（Dependency Injection）来实现。依赖注入是IoC的一种具体实现方式，它通过容器来动态地将组件之间的依赖关系注入到组件中，从而实现控制反转。

依赖注入有三种主要的方式：

构造器注入(需要结合@Configuration来使用)

- 通过构造函数来注入依赖对象。
- **优势**：明确表明了类的依赖关系，使得类的依赖关系更加明确和可见。
- **劣势**：当类有多个依赖关系时，构造函数的参数列表可能变得很长，增加了代码的复杂性。

```java
 		private final UserRepository userRepository;

    // 构造器注入
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    ...
    
    @Configuration
    public class AppConfig {

		    @Bean
		    public UserRepository userRepository() {
		        return new UserRepository();
		    }

		    @Bean
		    public UserService userService(UserRepository userRepository) {
		        return new UserService(userRepository);
		    }
		}
```

Setter注入（需要结合**@Autowired来使用**）

- 通过Setter方法来注入依赖对象。
- 优劣势：同上

```java
    private UserRepository userRepository;

    // Setter注入
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
```

字段注入

- 通过字段直接注入依赖对象。
- **优势**：简洁明了，不需要额外的构造函数或Setter方法。
- **劣势**：对象的依赖关系被直接暴露在类的字段中，降低了类的封装性。

```java
    @Autowired
    private UserRepository userRepository;
```

### 应用场景

- 控制层/服务层的依赖注入
- 数据访问层与业务逻辑层的解耦
- 组件的替换和扩展

## AOP（Aspect-Oriented Programming）

### 定义

AOP 即面向横面编程，是一种编程范式，它允许将横切关注点（cross-cutting concerns）从业务逻辑中分离出来，将它们定义为独立的模块，然后以声明的方式将这些模块应用到多个不同的组件中。这样做的目的是提高代码的重用性、可维护性和可扩展性。

### 作用

AOP 的作用在于解决了重复性代码的问题，将横切关注点（如日志记录、事务管理、安全检查等）与核心业务逻辑分离开来，使得代码更加模块化、清晰可读。

### 实现原理

在Spring中，AOP主要通过动态代理实现，具体而言有两种主要的实现方式：JDK动态代理和CGLIB动态代理。

1. **JDK 动态代理：**

   - JDK 动态代理是基于接口（UserService）的代理，它要求目标类（UserServiceImpl）必须实现一个接口。
   - 当目标类实现了接口时，Spring 容器会自动使用 JDK 动态代理生成一个实现了该接口（UserService）的代理类，并在代理类中织入切面逻辑。
   - JDK 动态代理通过  **`java.lang.reflect.Proxy`** 类和 **`java.lang.reflect.InvocationHandler`** 接口来实现。

   ```java
   public interface UserService {
       void addUser(String username);
   }
   
   public class UserServiceImpl implements UserService {
       @Override
       public void addUser(String username) {
           // 添加用户逻辑...
           System.out.println("User added: " + username);
       }
   }
   
   public class LoggingAspect implements InvocationHandler {
   
       private Object target;
   
       public LoggingAspect(Object target) {
           this.target = target;
       }
   
       @Override
       public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
           System.out.println("Before calling method: " + method.getName());
           Object result = method.invoke(target, args);
           System.out.println("After calling method: " + method.getName());
           return result;
       }
   }
   
   public class Main {
       public static void main(String[] args) {
           UserService target = new UserServiceImpl();
           LoggingAspect loggingAspect = new LoggingAspect(target);
           UserService proxy = (UserService) Proxy.newProxyInstance(
                   target.getClass().getClassLoader(),
                   target.getClass().getInterfaces(),
                   loggingAspect);
   
           proxy.addUser("Alice");
       }
   }
   ```

   首先定义了一个 **`UserService`** 接口，其中包含了一个 **`addUser`** 方法用于添加用户。然后，我们创建了一个 **`UserServiceImpl`** 类来实现这个接口，其中实现了 **`addUser`** 方法。

   接着，我们创建了一个名为 **`LoggingAspect`** 的日志记录类，实现了 **`InvocationHandler`** 接口。在这个类中，我们实现了 **`invoke`** 方法，该方法会在代理对象调用任何方法时被调用。在 **`invoke`** 方法中，我们首先记录了目标方法调用前的日志，然后调用目标方法，最后记录了目标方法调用后的日志。

   在 **`Main`** 类中，我们首先创建了一个 **`UserService`** 的实例 **`target`**，然后将这个实例传递给 **`LoggingAspect`** 的构造函数创建了一个 **`LoggingAspect`** 的实例 **`loggingAspect`**。接着，我们使用 **`Proxy.newProxyInstance`** 方法为 **`UserService`** 接口创建了一个代理对象 **`proxy`**，并将 **`loggingAspect`** 设置为代理对象的调用处理器。最后，我们调用了 **`proxy`** 的 **`addUser`** 方法。

2. CGLIB 动态代理：

   - CGLIB 动态代理是基于继承的代理，它不要求目标必须实现接口。
   - 当目标类没有实现接口时，Spring 容器会自动使用CGLIB动态代理生成一个目标类的子类，并在子类中织入切面逻辑。
   - CGLIB 动态代理通过字节码增强技术来实现。

   ```java
   public class UserService {
       public void addUser(String username) {
           // 添加用户逻辑...
           System.out.println("User added: " + username);
       }
   }
   
   public class LoggingAspect implements MethodInterceptor {
   
       @Override
       public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
           System.out.println("Before calling method: " + method.getName());
           Object result = proxy.invokeSuper(obj, args);
           System.out.println("After calling method: " + method.getName());
           return result;
       }
   }
   
   public class Main {
       public static void main(String[] args) {
           Enhancer enhancer = new Enhancer();
           enhancer.setSuperclass(UserService.class);
           enhancer.setCallback(new LoggingAspect());
   
           UserService proxy = (UserService) enhancer.create();
           proxy.addUser("Alice");
       }
   }
   ```

在Spring中，@Aspect 注解标记一个类后，Spring 会将其视为**切面类**，并在运行时自动为该类创建代理类对象，并将切面逻辑织入到代理对象中。就可以实现手动创建代理对象相似的功能，但更加简介和方便。

通过使用注解 @Aspect ，Spring 提供了一种声明式的方式来定义切面，并在AOP中应用它们，而无需手动编写代理逻辑和切面逻辑的代码。

- **@Before**：在目标方法执行前执行切面逻辑。
- **@After**：在目标方法执行后（无论是否发生异常）执行切面逻辑。
- @AfterReturing：在目标方法正常返回后执行切面逻辑。
- @AfterThrowing：在目标方法抛出异常后执行切面逻辑。
- @Around：在目标方法执行前后，控制目标方法的执行过程，可以自定义是否执行目标方法、执行前后的额外逻辑等。

### 应用场景

- **访问控制**：通过 AOP，可以很容易地实现安全性控制功能，如登录认证和权限检查、IP黑名单。
- **监控和日志记录**：AOP 可以用于监控应用程序允许状况，如统计访问次数、计算执行时间开销等等。
- **全局异常处理**：通过 AOP 可以轻松捕获和处理全局异常，而不是单独在每个方法中进行处理。
- **数据校验**：AOP 可以用于在数据进入应用程序之前对其进行校验，确保输入的有效性。

**题外话**：

**`@ExceptionHandler`** 和 **`@ControllerAdvice`** 并不是严格意义上的 AOP（面向切面编程）的一部分，而是 Spring MVC 中的一种异常处理机制。虽然它们在某种程度上类似于 AOP，但它们更多地是关于异常处理的技术，而不是切面的概念。

**`@ExceptionHandler`** 用于在控制器内部处理单个请求处理方法中抛出的异常，而 **`@ControllerAdvice`** 则用于集中处理应用程序中的异常，它通常与 **`@ExceptionHandler`** 结合使用来处理全局异常。

虽然 **`@ExceptionHandler`** 和 **`@ControllerAdvice`** 可以看作是一种通过注解来实现的切面功能，但它们更多地是针对异常处理的，而不是通常意义上的 AOP，它们不是通过动态代理来实现的。

## Spring 的启动流程

### 启动Spring应用加载上下文

- **初始化 SpringApplication 对象**：运行 SpringApplication(…)，加载 Application 应用上下文。

### 加载配置

- **加载配置文件**：读取配置文件，如 [application.properties](http://application.properties) 或 application.yml

### 注册和加载Bean

- **注册和加载Bean**：通过@ComponentScan 注解扫描类路径下的组件，如 @Service、@Repository、@Controller 等注解，将它们作为 Bean 注册并加载到 Bean 容器中。

### BeanFactory 准备

- **初始化 BeanFactory**：配置 Bean 工厂，并加载 Bean 定义。

### 初始化 Bean

- 对于每个 Bean 进行实例化、依赖注入、属性配置，并调用初始化方法等。

### 启动应用

- **完成Bean 初始化**：确保所有相关的 Bean 都已经创建并初始化。

### 就绪运行

- 应用完全启动并就绪，可以接收服务请求。

## Bean 的生命周期

### 实例化 Bean

- **通过构造器创建 Bean 实例（尚未填充属性）**。

### 设置属性值

- **Spring 注入属性值和 Bean 引用**。

### 调用 Bean 名称感知方法

- **如果 Bean 实现了 BeanNameAware 接口，Spring 将 Bean 的 ID 传递给 setBeanName 方法**。

### 调用 Bean 工厂感知方法

- **如果 Bean 实现了 BeanFactoryAware 接口，Spring 调用 setBeanFactory 方法，传入 BeanFactory**。

### 调用 ApplicationContext 感知

- **对于实现了 ApplicationContextAware 的 Bean，调用 setApplicationContext 方法**

### 前置处理器

- **BeanPostProcessor 的 postProcessBeforeInitialization 方法被调用**

### 初始化方法

- **如果 Bean 实现了 InitializingBean 接口，调用 afterPropertiesSet 方法**
- **如果 Bean 在 XML 中声明了 init-method，调用指定的方法**

### 后置处理器

- **BeanPostProcessor 的 postProcessAfterInitialization 方法被调用**

### Bean准备就绪

- **此时 Bean 已经准备好并可以被应用程序使用了**。

### 销毁 Bean

- **如果 Bean 实现了 DisposableBean 接口，调用 destroy 方法**。
- **如果 Bean 在 XML 中声明了 destroy-method，调用指定的方法**。

## Spring 加载 Bean的 方式

1. 基于 XML 的配置
2. 基于注解的配置
3. 配置类（@Configuration + @Bean）
4. 通过 FactoryBean

## Spring 的 bean 为什么是单例的呢，并且除了单例以外还有什么形式，如果是多例的话，会有什么影响

Spring 框架中Bean的默认作用域是`单例（singleton）`，这是出于以下几个原因：

1. **性能优化**：创建对象通常是一个昂贵的过程，尤其是涉及到 I/O 操作（如数据库连接）时。使用单例可以减少对象创建的次数，节省资源和提升性能。
2. **状态共享**：单例模式允许在应用的不同部分共享同一个 Bean 实例，这对于状态共享和管理非常有用。
3. **资源管理**：许多 Bean ，如数据源、会话工厂等，是自然的单例，因为它们封装了共享资源，如数据库连接池。

除了单例模式，Spring 还提供其他几种 Bean 的作用域：

- **单例（Singleton）**：在 Spring IoC 容器仅存在一个 Bean 实例，Bean 以单例方式存在。
- **原型（prototype）**：每次注入或通过 Spring 容器的 getBean() 请求时，都会创建一个新的Bean实例（这种模式就是多例）。
- **请求（request）**：每个 HTTP 请求都会创建一个新的 Bean ，该作用域仅在请求的处理过程中有效。
- **会话（session）**：在一个 HTTP 会话中，一个 Bean 定义对应一个 Bean 实例，该作用域同样仅在会话期间中有效。
- **应用（application）**：在一个 ServletContext 的生命周期内，一个 Bean 定义对应一个 Bean 实例，同样仅在 Web 应用的生命周期中有效。

如果将 Bean 定义为多例（prototype）作用域，将会有以下影响：

1. **资源使用增加**：每次请求 Bean 时都会创建新实例，会增加内存和资源的使用。
2. **状态管理**：多例 Bean 不会共享状态，每个 Bean 实例都有自己的状态。
3. **生命周期管理**：Spring 不会管理 prototype Bean 的完整生命周期，也就是说，Spring 不会调用 prototype Bean 的销毁方法。
4. **复杂性增加**：在使用多例 Bean 时，需要更加小心地管理其生命周期和依赖关系。

总的来说，选择正确的作用域取决于具体的应用需求。单例作用域适合于**需要共享状态的全局资源**，而原型作用域**适合于那些具有独立状态、生命周期较短或需要隔离的Bean、每次都需要一个新实例的情况**。

## Spring 循环依赖

循环依赖是指两个或多个Bean相互依赖对方，形成了一个闭环。在Spring中，循环依赖主要发生在单例Bean之间。Spring通过`三级缓存机制` 来解决Bean的循环依赖问题，Spring 的三级缓存是 `为了处理Bean对象在不同状态下的存储` 。

### 三级缓存机制

**一级缓存（Singleton Objects）：**

- 用于存储完全初始化好的Bean实例，这些Bean已经被创建且注入了依赖，可以直接使用。

**二级缓存（Early Singleton Objects）：**

- 存储已经实例化好但还没有完全初始化的 Bean，这些 Bean 实例已经存在，但还没有完全依赖注入和初始化。

**三级缓存（Singleton Factories）：**

- 存储用于生成 Bean 的工厂对象，这些工厂对象可以生成 Bean 的早期引用，以解决循环依赖问题。

**三级缓存的联系**

三级缓存是相互关联的，特别是在处理循环依赖的时候。当创建一个 Bean 时，Spring 可能需要从这些缓存中检索或移动 Bean，以确保正确的创建和初始化。

**Bean 的初始化与三级缓存的作用**

1. 实例化 Bean：

   - 首先，Spring 容器创建bean的实例。这一步通常是通过调用构造函数完成的。

2. 三级缓存（Singleton Factories）的使用：

   - 如果在bean的创建过程中检测到潜在的循环依赖，Spring会将一个能够生成bean的工厂对象放入三级缓存中。

3. 二级缓存（Early Singleton Objects）的使用：

   - 通过工厂对象生成的早期对象bean，在bean的进一步初始化（如依赖注入）之前，将bean被放入二级缓存中。此时，bean还未完全配置（如依赖注入和初始化回调可能尚未应用）。

4. 完成依赖注入和初始化：

   - 接下来，Spring 容器对bean进行依赖注入，并执行相关的初始化方法（如那些标注了**`@PostConstruct`**的方法或实现了**`InitializingBean`**接口的**`afterPropertiesSet`**方法）。

5. 移动到一级缓存（Singleton Objects）：

   - 一旦bean被完全初始化，它就从二级缓存中移除，并存放到一级缓存中。此时，bean已经完全准备好，可以被应用中的其他部分使用。

   ### BeanFactory 和 ApplicationContext 的区别

   BeanFactory 和 ApplicationContext 是 Spring 两个核心接口，都可以用来获取 Bean 实例，但在功能上有所不同。

   - BeanFactory
     - **提供了基本的依赖注入支持**。
     - **延迟加载，只有在明确请求时才初始化Bean**。
   - ApplicationContext
     - **完全初始化所有单例Bean**。
     - **支持国际化（i18n）、事件传播、资源加载等**。
     - **提供了AOP功能**。
     - **通常在应用程序中使用 ApplicationContext**。

   ### **为什么在对应的 service 和 controller 标注了 @Service 和 @RestController 注解之后，Spring 容器就能够扫描到呢?**

   > 答：之所以Spring容器能够扫描到这些容器，是因为@ComponentScan注解，该注解会扫描所有带有 @Component、@Service、@Repository、@Controller等注解的类，并未它们创建相对应的 Spring bean，随后这些 bean 可以通过依赖注入被其他部分所使用。所以当标注了@Service、@Controller等注解之后，Spring容器就会自动注册这些类，并在需要时创建它们的bean实例。

   **为什么在 service 的实现类 serviceimpl 标记了 @service 注解，在 controller 层只要注入 service 就可以引用serviceimpl 里面实现的功能呢？**

   答：这里面涉及到了 入**`自动装配`**的知识点。

   ### **自动装配的过程**

   - **搜索过程**：当**`@Autowired`**用于注入**`Service`**接口时，Spring查找所有可用的**`Service`**类型的Bean。如果找到了与依赖类型兼容的Bean（实现了Service接口的impl类），Spring就会自动将其注入到声明了**`@Autowired`**的地方。
   - **冲突解决**：如果存在多个匹配的Bean，Spring将需要额外的配置来选择使用哪一个，例如通过**`@Primary`**注解标注首选的Bean，或者使用**`@Qualifier`**注解指定注入哪一个特定的Bean。

   ### By Type 和 By Name 的区别

   **@Autowired 基于类型的依赖注入（By Type）**：

   - **定义**：在基于类型的注入中，Spring 容器使用要注入的属性或构造函数参数的类型来在容器中查找匹配的 Bean。

   - 代码示例：

     ```java
     @Autowired
     private MyService myService;
     ```

     在这个例子中，Spring 会在其容器中查找 MyService 类型的 Bean，并进行注入。

     **多个候选 Bean**：如果存在多个同类型的 Bean，而没有其他限定信息，Spring 将无法决定使用哪一个，从而导致异常。这种情况下，可以使用 @Qualifier 注解来指定 Bean 的名称。

   **@Autowired基于名称的依赖注入（By Name）**：

   **定义**：虽然**`@Autowired`**本身不提供直接的基于名称的注入，通过与**`@Qualifier`**结合使用，它可以非常灵活地实现**`基于名称的注入`**相似的功能。

   **代码示例**：

   ```java
   @Autowired
   @Qualifier("mySpecificService")
   private MyService myService;
   ```

   ```java
   @Service("mySpecificService")
   public class MyServiceImpl implements MyService {
       // 实现细节
   }
   ```

   在这个例子中，Spring 会在其容器中查找名为 `mySpecificService` 的Bean来注入。

   **@Resource 基于名称的依赖注入（By Name）（默认）**

   **定义**：**`@Resource`**注解是基于 JSR-250 标准，它可以根据名称或类型来注入依赖。 **代码示例**：

   ```java
   @Resource(name = "mySpecificService")
   private MyService myService;
   ```

   在这个例子中，**`@Resource`**注解通过**`name`**属性直接指定了要注入的 Bean 名称，从而实现了基于名称的注入。 **@Resource 基于类型的依赖注入（By Type）**

   ```java
   @Resource
   private MyService myService;
   ```

   ### 总结：

   - **基于类型**的注入更常见，它强调了类型的兼容性和接口编程的原则，适用于大多数情况，尤其是当每个类型只有一个Bean实例时。
   - **基于名称**的注入在需要从多个同类型的Bean中选择特定一个时非常有用，它提供了更精确的控制，但牺牲了一些类型安全性。

   在Spring中，事务管理是非常关键的一部分，但是在使用过程中，有时候事务会失效。事务失效的原因可能有很多，以下是一些常见的原因：

   确保方法是public的。 确保使用了Spring管理的事务注解或配置。 确保正确配置了事务管理器和数据源。 避免在同一个类中进行内部方法调用。 确保异常处理符合事务管理的要求。

   - 方法不是public的：Spring的事务管理默认是基于AOP（Aspect-Oriented Programming）的，只有public方法才能被代理。因此，如果事务方法不是public的，事务将不会生效。
   - 方法内部调用：如果在同一个类中，一个非事务方法调用了一个事务方法，事务将不会生效。这是因为Spring AOP代理机制在内部方法调用时不会创建代理对象。解决方法是将事务方法提取到另一个类中，或者使用AspectJ进行事务管理。
   - 没有使用Spring管理的事务注解或配置：确保你在配置文件或类中正确使用了@Transactional注解，或者在XML配置中正确定义了事务管理。
   - 异常未被捕获或未被正确抛出：默认情况下，Spring只会在RuntimeException和Error子类异常时回滚事务。如果你捕获了异常或者抛出了检查异常（Checked Exception），事务可能不会回滚。可以通过rollbackFor属性指定需要回滚的异常类型。