package com.taskagile.domain.security;

import org.springframework.stereotype.Component;

@Component
public class PasswordEncryptorDelegator implements PasswordEncryptor {
// 실제 비밀번호 암호화 로직은 다른곳으로 위임됨!
  @Override
  public String encrypt(String rawPassword) {
    
    return rawPassword;
  }
}
