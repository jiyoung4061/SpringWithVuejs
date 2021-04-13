package com.taskagile.domain.common.event;

import org.springframework.context.ApplicationEvent;

public class DomainEvent extends ApplicationEvent{

  private static final long serialVersionUID = -444783093811334147L;

  public DomainEvent(Object source) {
    super(source);
  }

  public long occuredAt() {
    // 잠재적인 구현체의 타임스탬프 반환(event 발생시간을 위해 ApplicationEvent에 의존하지 않아도 O)
    return getTimestamp();
  }

}
