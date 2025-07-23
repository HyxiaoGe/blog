---
title: RabbitMQ 整理
date: 2025-02-26 20:48:39
tags:
  - RabbitMQ
categories: 消息队列
---

## 消息队列-RabbitMQ

RabbitMQ 基于 AMQP 协议，Advanced Message Queuing Protocol（高级消息队列协议），是一个网络协议，是应用层协议的一个开放标准，为面向消息中间设计的。基于这个协议的客户端和消息中间件可以传递消息，并且不会因为客户端或中间件产品的不同所受限，也不会受到不同开发语言的限制。

### 主要特性

1. 灵活的路由能力
   - RabbitMQ 提供了多种交换机类型（如 direct、fanout、topic、headers），这些交换器支持灵活的消息路由机制。
   - 它允许精确控制消息应该被发送到哪个队列，支持复杂的路由方案。
2. 高可靠性和持久性
   - RabbitMQ 支持消息和队列的持久化，确保在系统故障时消息不会丢失。
   - 它支持镜像队列（mirrored queues）来提高可用性，这通过在多个节点上复制队列来实现。
3. 多种协议和语言支持
   - RabbitMQ 支持多种消息协议，包括 AMQP、STOMP、MQTT 等。
   - 它提供了广泛的客户端库支持，适用于各种编程语言，如 Java、Python、Ruby、.NET等。
4. 集群和负载均衡
   - RabbitMQ 可以在多个服务器上形成集群，提高吞吐量和可靠性。
   - 它支持负载均衡和故障转移，帮助保持应用的高可用性。
5. 管理和监控
   - RabbitMQ 附带管理界面，允许用户轻松管理和监控他们的消息系统。
   - 提供了丰富的监控和管理 API，方便集成到现有的监控系统。
6. 易于扩展和集成
   - 它的插件系统使得扩展 RabbitMQ 功能变得简单，可以添加新的功能或集成到其他系统中。
   - 社区提供了许多插件，例如用于消息追踪、Shovel 插件用于在多个 RabbitMQ 实例之间迁移消息等。
7. 事务支持
   - RabbitMQ 提供事务功能，允许将消息的发送、接受和确认操作组合为单个原子操作。
   - 虽然事务会增加一定的开销，但它们对于确保消息处理的完整性非常有用。
8. 灵活的消息处理模式
   - 支持多种消息处理模式，包括简单的点对点通信、工作队列模式、发布/订阅模式等。
   - 通过不同的交换器和队列配置，可以灵活地实现各种消息处理需求。

### 主要结构

![img](http://www.hyxiaoblog.com/images/21/rabbitmq_model.png)

1. 交换器（Exchanges）
   - 交换器是 RabbitMQ 消息路由的核心组件，它负责接收生产者发送的消息并根据路由规则将它们转发到一个或多个队列。
   - RabbitMQ 提供了几种类型的交换器：`direct`、`topic`、`fanout` 和 `headers`，每种类型的交换器都有其特定的路由逻辑。
2. 队列（Queues）
   - 队列是 RabbitMQ 中的基本存储结构，用于存储待消费的消息。
   - 队列与交换器之间通过绑定关系（Binding）建立连接，决定了哪些消息应该被路由到特定的队列。
3. 绑定（Bindings）
   - 绑定是交换器和队列之间的关系，它基于路由键（routing key）和（对于某些交换器类型）绑定键（binding key）来路由消息。
   - 绑定可以包含路由键匹配规则，尤其是在适用 topic 交换器时。
4. 生产者（Producers）
   - 生产者是发送消息到交换器的应用程序或服务。
   - 生产者决定将消息发送到哪个交换器，并指定消息的路由键。
5. 消费者（Consumers）
   - 消费者从队列中提取消息并处理它们。
   - 消费者可以监听一个或多个队列，以接收和处理存储在队列中的消息。
6. 消息（Messages）
   - 消息是 RabbitMQ 传递的数据单元，由生产者创建并发送到交换器。
   - 每个消息都包含有效负载（payload，即实际数据）和标签（header），其中可能包括路由键、消息优先级、过期时间等信息。
7. 虚拟主机（Virtual Hosts）
   - 虚拟主机提供了一种隔离方式，可以在同一个 RabbitMQ 服务器上运行多个独立的消息系统。
   - 每个虚拟主机都有自己的队列、交换器和绑定。
8. 用户和权限
   - RabbitMQ 允许你定义多个用户，并且可以给每个用户分配不同的角色和权限。
   - 这种权限控制可以用来限制对特定队列、交换器和其他资源的访问。

### 工作流程

1. **生产者**创建一条消息，这条消息包含有效负载（即实际要传递的数据）和一些元数据（如路由键）。
2. 生产者将这条消息发送到一个**交换器**。生产者在发送消息时指定**交换器**和**路由键**。
3. 交换器接收到消息后，根据**交换类型**（如 direct、fanout、topic）和消息的路由键来决定如何路由消息。
4. 在**binding key**的帮助下，交换器将消息路由到一个或多个**队列**。绑定定义了交换器和队列之间的关系，并可能包含与路由键匹配的模式。
5. 一旦消息被路由到某个队列，它将在那里等待，直到出现一个**消费者**准备好接收它。
6. 如果消息配置了消息持久化，消息将在磁盘上存储，以防止在系统崩溃时丢失。
7. 消费者从队列中接收消息，并进行处理。消费者可以是任何能够连接到队列并读取消息的应用程序或服务。
8. 消费者可以手动或自动确认消息。确认（acknowledge）是否告诉 RabbitMQ 消息已经被接收并处理。
9. 一旦消息被正确处理，消费者会发送一个确认给 RabbitMQ。
10. 如果消费者因为某种原因无法处理消息，它可以拒绝（reject）或将消息重回队列（nack）。
11. 当 RabbitMQ 收到确认后，它将从队列中移除该消息。
12. 如果在处理消息时发生故障，系统可以配置为重试机制或将消息移动到死信队列（dead-letter queue）。

![Screenshot_2024-07-10-13-19-25-957_com.android.chrome-edit.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/4d514fab-2492-4877-a269-a017b8992bb6/e21bc9b8-8a43-4e48-b3f9-1dee429ddef2/Screenshot_2024-07-10-13-19-25-957_com.android.chrome-edit.jpg)

### Exchanges 交换器

在RabbitMQ中，交换器（Exchanges）是决定如何路由消息的关键组件。它们接收来自生产者的消息，并根据特定规则将它们路由到一个或多个队列。

RabbitMQ 提供了四种主要的交换器类型，每种类型根据不同的规则路由消息。

1. **Direct Exchange**

   - **工作原理**：根据消息的路由键（routing key）将消息路由到具有相同绑定值（binding key）的队列。
   - **用途**：当你想要将消息发送到指定的队列时，可以使用 direct exchanges。它适用于一对一的消息路由场景。
   - **示例场景**：订单服务向指定的处理队列发送订单更新消息。

   示例代码：

   ```java
   // 创建 Direct Exchange
   @Bean
   public DirectExchange directExchange() {
       return new DirectExchange("direct_exchange");
   }
   
   // 创建队列
   @Bean
   public Queue orderQueue() {
       return new Queue("order_queue");
   }
   
   // 绑定队列到交换器
   @Bean
   public Binding bindingDirect(Queue orderQueue, DirectExchange directExchange) {
       return BindingBuilder.bind(orderQueue).to(directExchange).with("order_key");
   }
   ```

2. **Fanout Exchange**

   - **工作原理**：忽略路由键，将消息广播到所有绑定到该交换器的队列。
   - **用途**：当你需要将相同的消息发送到多个队列时，fanout exchange 非常有用。它实现发布/订阅模式。
   - **示例场景**：广播系统通知或实时更新，如股票价格变动。

   示例代码：

   ```java
   // 创建 Fanout Exchange
   @Bean
   public FanoutExchange fanoutExchange() {
       return new FanoutExchange("fanout_exchange");
   }
   
   // 创建队列
   @Bean
   public Queue notificationQueue() {
       return new Queue("notification_queue");
   }
   
   // 绑定队列到交换器
   @Bean
   public Binding bindingFanout(Queue notificationQueue, FanoutExchange fanoutExchange) {
       return BindingBuilder.bind(notificationQueue).to(fanoutExchange);
   }
   ```

3. **Topic Exchange**

   - **工作原理**：根据消息的路由键和队列的绑定键（可以包含通配符）进行模糊匹配，来决定消息路由到哪些队列。
   - **用途**：当你需要根据特定模式或多个标准路由消息时，topic exchange 是最佳选择。它提供了很高的灵活性。
   - **示例场景**：向不同的日志记录系统发送不同级别（如 error，info，debug）的日志消息。

   示例代码：

   ```java
   // 创建 Topic Exchange
   @Bean
   public TopicExchange topicExchange() {
       return new TopicExchange("topic_exchange");
   }
   
   // 创建队列
   @Bean
   public Queue logQueue() {
       return new Queue("log_queue");
   }
   
   // 绑定队列到交换器
   @Bean
   public Binding bindingTopic(Queue logQueue, TopicExchange topicExchange) {
       return BindingBuilder.bind(logQueue).to(topicExchange).with("log.*");
   }
   ```

   ```java
   @Component
   public class LogMessagePublisher {
   
       @Autowired
       private RabbitTemplate rabbitTemplate;
   
       @Autowired
       private TopicExchange topicExchange;
   
       public void sendInfoLog(String message) {
           rabbitTemplate.convertAndSend(topicExchange.getName(), "log.info", message);
       }
   
       public void sendErrorLog(String message) {
           rabbitTemplate.convertAndSend(topicExchange.getName(), "log.error", message);
       }
   }
   ```

4. **Headers Exchange**

   - **工作原理**：基于消息头（headers）中的一个或多个属性进行匹配，而不是路由键。匹配规则可以是“全部匹配”（all）或“任意匹配”（any）。
   - **用途**：当你需要基于多个属性进行复杂的路由规则时，可以使用 headers exchanges。
   - **示例场景**：基于消息内容的多个属性（如源、目的地、优先级）路由消息到不同的处理队列。

   示例代码：

   ```java
   // 创建 Headers Exchange
   @Bean
   public HeadersExchange headersExchange() {
       return new HeadersExchange("headers_exchange");
   }
   
   // 创建队列
   @Bean
   public Queue processQueue() {
       return new Queue("process_queue");
   }
   
   // 绑定队列到交换器
   @Bean
   public Binding bindingHeaders(Queue processQueue, HeadersExchange headersExchange) {
       Map<String, Object> map = new HashMap<>();
       map.put("x-match", "all");
       map.put("header1", "value1");
       map.put("header2", "value2");
       return BindingBuilder.bind(processQueue).to(headersExchange).whereAll(map).match();
   }
   ```

### Queue 队列

### **持久化**

- **持久化队列**：在 RabbitMQ 中，队列可以被标记为持久化（durable）。持久化队列会在代理重启后自动重建，但这本身并不保证队列中的消息也是持久的。
- **消息持久化**：要确保消息不丢失，除了声明队列为持久化之外，发送到队列的每条消息也需要被标记为持久化。这意味着消息会被写入磁盘，尽管这可能会引入额外的性能开销。
- **写入磁盘的时机**：RabbitMQ 不会为每条消息写入磁盘，而是可能仅在必要时进行，这取决于消息代理的配置和当前的负载。这种机制提供了性能和持久性之间的平衡。

**在代码中使用队列持久化**

声明一个持久化队列

```java
@Bean
public Queue myDurableQueue() {
    return new Queue("myDurableQueue", true); // true 表示队列是持久化的
}
```

在这个示例中，`Queue` 的构造函数接受一个布尔值作为第二个参数，用来指定队列是否持久化。`true` 表示队列是持久化的。

对于消息的持久化，可以在发送消息时设置它的持久性。使用 `MessageProperties` 设置消息为持久化：

```java
MessageProperties messageProperties = new MessageProperties();
messageProperties.setDeliveryMode(MessageDeliveryMode.PERSISTENT);
Message message = new Message("Your message content".getBytes(), messageProperties);

rabbitTemplate.send("myDurableQueue", message);
```

在这个示例中，`MessageDeliveryMode.PERSISTENT` 指定了消息应该被持久化。

### **事务支持**

- RabbitMQ 中的事务允许你将一系列动作（如发送消息、确认消息）包装在一个事务中。事务保证了这些操作要么全部成功，要么全部失败，从而提供了一定程度的消息处理保证。
- 操作步骤：
  - 开启事务：通过 `channel.txSelect()` 开启事务。
  - 执行操作：在事务中发送消息或执行其他操作。
  - 提交或回滚：使用 `channel.txCommit()` 提交事务或使用 `channel.txRollback()` 回滚事务。

示例代码：

```java
Channel channel = connection.createChannel();
try {
    channel.txSelect();
    channel.basicPublish("", "queue_name", null, message.getBytes());
    // 可能的其他操作...
    channel.txCommit();
} catch (Exception e) {
    channel.txRollback();
}
```

但是这种事务机制在 RabbitMQ 中会显得影响消息吞吐量。由于每个事务都涉及到磁盘 I/O 操作来确保状态的持久化，这会导致性能瓶颈。对于需要高吞吐量的系统，事务可能不是一个理想的选择。

**替代方案**

![img](http://www.hyxiaoblog.com/images/21/message_reliable.png)

- **confirm 确认模式**

  - 消息一旦从生产者发送给 MQ Server，也就是被交换器接收到，这个时候会有一个回调 confirmCallback，代表 MQ Server 接收到了。不管消息是否消费成功，这个回调函数一定会被执行。

  **示例代码**：在代码设置 confirm 确认模式

  ```java
  /**
  * correlationData: 相关性数据
  * ack: 交换机是否成功接收到消息，true：成功
  * cause: 失败的原因（成功则为null）
  */
  rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
      if (ack) {
          log.info("交换机接收消息成功~~ {}", cause);
          // 确认成功逻辑
      } else {
          log.info("交换机接收消息失败~~ {}", cause);
          // 确认失败逻辑
      }
  });
  ```

- **return 回退模式**

  - 如果交换器无法根据自身的类型和路由键或绑定规则将消息路由到一个队列，它会调用生产者的回退回调函数（`returnCallback`）。这通常意味着消息无法送达任何队列。

  **示例代码**：在代码设置 return 回退模式

  ```java
  rabbitTemplate.setReturnsCallback(returnedMessage -> {
      log.info("return");
      log.info("returnedMessage:{}", returnedMessage);
  });
  ```

**结合使用**

通常情况下，`confirmCallback` 和 `returnCallback` 被一起使用，以确保消息不仅被交换器接收，而且能被正确路由到队列。

```java
rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
    if (ack) {
        // 确认成功逻辑
    } else {
        // 确认失败逻辑，例如记录日志、重试等
    }
});

rabbitTemplate.setReturnCallback((message, replyCode, replyText, exchange, routingKey) -> {
    // 处理无法路由的消息，例如记录日志、通知生产者等
});

rabbitTemplate.setMandatory(true); // 设置为 true，以确保触发 returnCallback
```

设置了 `setMandatory(true)` 之后，如果消息无法被正确路由到队列，`returnCallback` 会被触发。如果没有设置 `mandatory` 参数，无法路由的消息会被 RabbitMQ 丢弃，生产者不会收到通知。

### **死信队列**

死信队列（Dead Letter Queue, DLQ）是用来收集死信的队列。在消息队列服务中，死信通常是指**那些无法被正常消费的消息**。有几种情况会导致消息称为死信：

1. **消息被拒绝（Rejected）**：消费者收到消息后，可以选择拒绝它，这是可以设置是否重新入队。如果消费者拒绝消息且不重新入队，该消息就会成为死信。
2. **消息过期**：如果消息在队列中存在时间超过了设置的TTL（Time-To-Live），它就会变成信息。
3. **队列达到最大长度**：如果队列满了，新消息就会变成死信。

在 RabbitMQ 中，你可以通过配置队列的参数来指定死信交换器（DLX）和死信路由键（DLK）。当消息成为死信后，它会被发送到 DLX 指定的交换器，并根据 DLK 进行路由。

**示例代码**：配置死信队列

```java
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx_exchange");
args.put("x-dead-letter-routing-key", "dlx_routing_key");

@Bean
public Queue myQueue() {
	return new Queue("myQueue", true, false, false, args);
}

@Bean
public DirectExchange deadLetterExchange() {
	return new DirectExchange("dlx_exchange");
}

@Bean
public Queue dlQueue() {
	return new Queue("deadLetterQueue");
}

@Bean
public Binding dlBinding() {
	return BindingBuilder.bind(dlQueue()).to(deadLetterExchange()).with("dlx_routing_key");
}
```

在这个配置中，如果 `myQueue` 中的消息变成了死信，它会被路由到 `deadLetterQueue` 队列。

### **延迟队列**

延迟队列（Delayed Queue）是一种特殊类型的队列，消息被发送到这个队列之后不会立即被消费，而是会在延迟一定时间后才能被消费。

需要注意的是，RabbitMQ 本身默认不支持延迟队列，但是可以通过**安装插件**或者**使用消息TTL和死信队列的组合**来实现相似的功能。

1. **安装插件**

- 先通过命令行 `rabbitmqctl veriosn` 得到mq的版本号，根据版本号去下载插件

- 下载延迟插件 https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases

- 下载好了之后，传到 Linux 服务器

- 然后再从虚拟机拷贝到 docker 的 rabbitmq 插件中：`docker cp rabbitmq_delayed_message_exchange-3.9.0.ez rabbitmq:/plugins`

- 运行命令开启延迟插件，`rabbitmq-plugins enable rabbitmq_delayed_message_exchange`

- 查看插件列表是否存在延迟插件，`rabbitmq-plugins list`

- `ctrl+d`退出控制台并且重启rabbitmq，`docker restart rabbitmq`

  示例代码：

  ```java
  @Configuration
  public class DelayConfig_Article {
  
      // 定义交换机的名称
      public static final String EXCHANGE_DELAY_ARTICLE = "exchange_delay_article";
  
      // 定义队列的名称
      public static final String QUEUE_DELAY_ARTICLE = "queue_delay_article";
  
      // 统一定义路由key
      public static final String DELAY_DISPLAY_ARTICLE = "delay.display.article";
  
      // 创建交换机
      @Bean(EXCHANGE_DELAY_ARTICLE)
      public Exchange exchange() {
          return ExchangeBuilder
                      .topicExchange(EXCHANGE_DELAY_ARTICLE)
                      .durable(true)
                      .delayed()              // 设置延迟特性
                      .build();
      }
  
      // 创建队列
      @Bean(QUEUE_DELAY_ARTICLE)
      public Queue queue() {
          return QueueBuilder
                  .durable(QUEUE_DELAY_ARTICLE)
                  .build();
      }
  
      // 创建绑定关系
      @Bean
      public Binding delayBindingArticle(@Qualifier(EXCHANGE_DELAY_ARTICLE) Exchange exchange,
                                          @Qualifier(QUEUE_DELAY_ARTICLE) Queue queue) {
          return BindingBuilder
                  .bind(queue)
                  .to(exchange)
                  .with("delay.display.*")
                  .noargs();
      }
  
      /**
       * 设置消息属性处理器，目的是设置延迟的时间
       * @param times
       * @return
       */
      public static MessagePostProcessor setDelayTimes(Integer times) {
          return message -> {
              message.getMessageProperties().setDeliveryMode(MessageDeliveryMode.PERSISTENT);
              message.getMessageProperties().setDelay(times);
              return message;
          };
      }
  
  }
  ```

  ```java
  ...
  Integer delayTimes = 10 * 1000;
  MessagePostProcessor processor = DelayConfig_Article.setDelayTimes(delayTimes);
  
  rabbitTemplate.convertAndSend(DelayConfig_Article.EXCHANGE_DELAY_ARTICLE,
                                  DelayConfig_Article.DELAY_DISPLAY_ARTICLE,
                                  message,
                                  processor);
  ...
  ```

这个插件扩展了 RabbitMQ 的功能，允许创建一个自定义的交换器类型 `x-delayed-message`，这种类型的交换器可以接收带有延迟信息的消息，并在指定的延迟时间后将消息路由到绑定的队列。

- 使用 `.delayed()`方法标记交换器以支持延迟消息。
- 在发送消息时，通过`MessagePostProcessor`设置消息的延迟时间，这是通过设置消息属性中的 `x-delay`来实现的。
- 当消息发送到这个交换器时，它不会立即被路由到一个队列，而是会在经过指定的延迟时间之后被路由。

1. **使用TTL和DLX实现延迟队列：**

   ```java
   @Bean
   public Queue delayProcessQueue() {
       Map<String, Object> args = new HashMap<>();
       args.put("x-dead-letter-exchange", "dlx_exchange");
       args.put("x-dead-letter-routing-key", "process_routing_key");
       args.put("x-message-ttl", 60000);	// 消息TTL为60000ms(1分钟)
   
       return new Queue("delayQueue", true, false, false, args);
   }
   
   @Bean
   public DirectExchange processExchange() {
       return new DirectExchange("processExchange");
   }
   
   @Bean
   public Queue processQueue() {
       return new Queue("processQueue");
   }
   
   #Bean
   public Binding processBinding() {
       return BindingBuilder.bind(processQueue()).to(processExchange()).with("process_routing_key");
   }
   
   @Bean
   public Binding delayBinding() {
       return BindingBuilder.bind(delayProcessQueue()).to(processExchange()).with("delay_routing_key");
   }
   ```

在这个示例中，`delayQueue` 是一个带有 TTL 和 DLX 配置的队列。消息会在这个队列中延迟一定时间（这里是1分钟），然后通过 DLX 被发送到 `processQueue` 队列进行处理。

使用 TTL 和 DLX 实现的延迟队列的**工作流程**大致如下：

1. 生产者（`producer`）将消息发送到一个普通的交换器（`processExchange`）。

2. 该交换器将消息路由到配置有 TTL 和 DLX 的队列（`delayQueue`）。

3. 消息在`delayQueue`中停留，直到其 TTL 过期。如果消息在 TTL 时间内没有被消费，它就会变成死信。

4. 一旦消息成为死信，它会被发送到配置在`delayQueue`上的DLX（`dlx_exchange`）。

5. DLX 交换器（`dlx_exchange`）将这个死信路由到最终的处理队列（`processQueue`）。

6. 消费者（`comsumer`）监听`processQueue`，准备处理消息。

   ```rust
   producer -> processExchange -> delayQueue --(after TTL)--> DLX(dlx_exchange) -> processQueue -> consumer
   ```

这里的`DLX`是`delayQueue`配置的死信交换器，它负责接收`delayQueue`中过期的消息，并将它们路由到`processQueue`。需要确保`delayQueue`的DLX指向了正确的交换器，这个交换器会将消息路由到`processQueue`。

### **重回队列**

在 RabbitMQ 中，“重回队列”（Requeue）是一个过程，当消费者因为某些原因不能处理接收到的消息时，它可以选择将消息发送回队列中以便稍后重新消费。

**重回队列适合场景**

1. 手动拒绝消息：

   - 当消费者接收到消息但不想或不能立即处理时，它可以使用 `basicReject` 或 `basicNack` 方法拒绝消息，并将 `requeue` 标志设置为 `true`，这会将消息重新放回队列。

     ```java
     channel.basicNack(message.getMessageProperties().getDeliveryTag(), true, true);
     ```

2. 消费者断开连接：

   - 如果消费者在处理消息时断开连接（比如由于崩溃或网络问题），没有发送 ack（消息确认），那么 RabbitMQ 会将消息重新入队。

**与死信队列和延迟队列的关系**

```
**死信队列**：
```

- 如果消息被消费者多次拒绝且不重回队列（`requeue`标志设置为`false`），或者消息超过了最大重试次数（如果设置了），那么这条消息可以被发送到死信队列。

- 死信队列用来收集那些无法被成功消费的消息，以便后续可以对这些消息进行监控和处理。

  **延迟队列**：

- 与重回队列不同，延迟队列通常是用来延迟消息的投递。当你希望消息在一段时间后被处理，而不是立即被消费时，可以使用延迟队列。

- 如果一个消息在延迟队列中到期后不能被成功消费，并且不再被重回队列，它同样可以变成死信并被发送到死信队列。

**注意事项**

- 无限重试的风险：
  - 如果消息被不断地重回队列而不进行任何修改，这可能导致“死循环”，其中消费者不断尝试处理同一条消息。
  - 为了避免这种情况，通常需要实现一些逻辑来跟踪消息的重试次数，并在超过某个阈值后将其发送到死信队列或其他的处理队列。
- 消息顺序：
  - 如果队列中的消息顺序很重要，那么重回队列可能会打乱原有的顺序，因为重新排队的消息将会放置在队列的末尾。

### 手动确认和自动确认

在 RabbitMQ 中，消息确认（ACK）是保证消息被正确处理的一种机制。生产者将消息发送到队列中，消费者从队列中获取消息并进行处理。一旦消息被成功处理，消费者应该向 RabbitMQ 发送一个确认信号，即 ACK。这个确认过程可以是自动的或手动的，具体取决于消费者的配置。

**手动确认（Manual-acknowledge）**

- 在手动确认模式下，消费者必须明确地告诉 RabbitMQ 它已经完成了消息的处理，并且消息可以被安全地删除。

- 如果消费者在处理消息之前发生故障，消息不会丢失，因为它还没有被确认。

- 手动确认给了消费者更多的控制，但也增加了复杂性，因为需要在代码中明确地处理ACK。

- 使用手动确认可以避免消息的意外丢失，适用于需要保证**消息处理可靠性**的场景。

  示例代码：

  ```java
  // 消费者接收消息的方法
  public void onMessage(Message message, Channel channel) throws IOException {
      try {
          // 处理消息的逻辑...
  
          // 手动发送ACK
          channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
      } catch (Exception e) {
          // 如果处理消息时发生异常，拒绝消息，并根据情况决定是否重新入队
          channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);
      }
  }
  ```

  在这个示例中，如果消息成功处理，消费者会调用 `basicAck` 方法来确认消息。如果处理失败，它会调用 `basicNack` 方法来拒绝消息，并可能选择将其重新入队。

**自动确认（Auto-acknowledge）**

- 在自动确认模式下，一旦消息被投递给消费者，RabbitMQ 就会立即将其标记为已确认。
- 这种模式下简化了处理流程，因为消费者不需要显示地发送 ACK 信号。
- 但是，如果消费者在处理消息后发生故障（例如，应用崩溃或断电），那么消息可能会丢失，因为 RabbitMQ 认为它已经被处理了。
- 自动确认适用于那些对消息丢失不敏感或可以容忍丢失的场景。

## 常见问题

### RabbitMQ 如何保证消息的可靠性

**可靠性**主要关注消息在传输过程中不丢失，确保消息从生产者到MQ Server 再到消费者的过程中被正确处理。

RabbitMQ 提供了多种机制来确保消息的可靠性和安全性，以下是几个主要的方法：

1. 消息持久化
   - 将消息标记为持久化，并且确保队列也是持久的，这样即使在 RabbitMQ 重启后，消息也不会丢失。
2. 事务
   - 虽然事务会降低性能，但它们可以确保一系列操作（如消息发布）要么全部成功，要么全部不执行。
3. confirm 确认模式和 return 回退模式
   - 前者是一个轻量级的、异步的机制，允许生产者知道其消息是否已成功到达交换器。
   - 后者是当消息无法路由到任何一个队列时，它会调用生产者的回退回调函数。
4. 消费者确认（Consumer Acknowledgements）
   - 通过手动确认模式，消费者可以控制什么时候确认消息。这确保了只有在消息被正确处理后，它才会从队列中移除。
5. 死信队列
   - 设置死信队列可以处理无法正常消费的消息，例如因为消息被拒绝、过期或队列达到最大长度。

### RabbitMQ 如何做到削峰限流

1. **预取计数（Prefetch Count）**

   通过设置预取计数，可以限制 RabbitMQ 向每个消费者发送的未确认消息的数量。一旦达到这个数量，RabbitMQ 将停止向该消费者发送更多消息，直到它开始确认消息。

   ```java
   channel.basicQos(prefetchCount);
   ```

   在这里，`prefetchCount` 是你想要设置的预取数量。这个设置可以帮助避免给单个消费者分配过多消息，从而平衡负载并限制处理速率。

2. **消息延迟**

   可以将消息发送到延迟队列/死信队列，并设定消息的延迟时间。这样，消息会在指定的延迟之后才被投递到实际的工作队列。

3. **手动消息确认**

   通过手动确认消息，可以更细粒度地控制消息的处理速度。消费者在完成消息处理后手动发送确认，这样可以根据处理能力来调整接收消息的速度。

### RabbitMQ 如何保证最终一致性

使用数据库（DB）来辅助 RabbitMQ 实现消息的最终一致性是一个常见的模式，尤其是在分布式系统和微服务架构中。这种方法通常涉及到在消息处理和数据库操作之间保持一致性。以下是如何借助数据库实现 RabbitMQ 消息的最终一致性的步骤：

//	TODO 消息的延迟投递，做二次确认，回调检查

1. 事务日志记录
   - 在发送消息前，首先在数据库中记录事务日志。这个日志记录了即将发送的消息及其状态。这样做的目的是在发送消息之前确保有一个持久的记录存在。
2. 发送消息
   - 发送消息到 RabbitMQ，此时消息可能仅被标记为“待发送”或类似状态。
3. 发布者确认
   - 利用 RabbitMQ 的发布者确认机制来确保消息已被交换器接收。一旦收到确认，更新数据库中的事务日志，表明消息已成功发送。
4. 消费者处理
   - 消费者从 RabbitMQ 接收消息并进行处理。处理过程可能涉及到更改数据库的数据。
5. 处理确认
   - 处理完成后，消费者手动确认消息。这个确认告诉 RabbitMQ 消息已被成功处理，可以将数据的日志记录删除或者更改消息状态为完成。
6. 处理失败和重试
   - 如果消费者处理失败，可以利用 RabbitMQ 的重试机制或将消息放入死信队列。同时，可以在数据库中记录失败事件，以便进行后续的错误处理或人工干预。
7. 幂等性处理
   - 在消费者端实现幂等性，确保即使同一消息被重复消费，也不会对系统状态产生不良影响。
8. 同步或补偿机制
   - 在某些情况下，如果处理过程中发生了故障或不一致性，可能需要在数据库中执行补偿操作来恢复一致性。
9. 监控和告警
   - 通过对 RabbitMQ 队列和数据库的监控，可以及时发现问题并进行干预，比如处理积压的消息或解决数据不一致的问题。

### RabbitMQ 如何避免消息被重复消费

1. 使用唯一标识符
   - 为每条消息分配一个唯一标识符（如 UUID 或 消息 ID）。在消息者处理消息之前，先检查数据库或缓存中是否存在该标识符。如果存在，表明该消息已被处理，可以跳过；如果不存在，进行处理并记录该标识符。
2. 消息指纹
   - 为消息内容生成一个指纹（如哈希值），并检查这个指纹是否已被处理。这种方法适用于消息内容不变的情况。
3. 利用Redis的原子性
   - 需要考虑两个问题
     - 问题1：是否要进行数据落库，如果落库的话，关键解决的问题是数据库和缓存如何做到原子性？（假如redis保存数据成功，数据库保存失败的情况）
     - 问题2：如果不进行落库，那么都存储到缓存中，如何设置定时同步的策略？（并且有可能会出现redis保存数据失败的情况）