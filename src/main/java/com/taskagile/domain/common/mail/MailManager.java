package com.taskagile.domain.common.mail;

public interface MailManager {
  // 받는 사람의 이메일주소, 메일 제목, 메시지 템플릿과 변수들을 받음.
  void send(String emailAddress, String subject, String template, MessageVariable... variables);
}
