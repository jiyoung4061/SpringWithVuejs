package com.taskagile.domain.common.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class DefaultDomainEventPublisher implements DomainEventPublisher {
  @Autowired
  private ApplicationEventPublisher actualPublisher; // 실제 이벤트 발행자

  @Override
  public void publish(DomainEvent event) { // 이벤트 발행 작업을 위임
    actualPublisher.publishEvent(event);
  }
}
