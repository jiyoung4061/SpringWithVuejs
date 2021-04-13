package com.taskagile.domain.security;

public interface PasswordEncryptor {
  /**
   * Encrypt a raw password
   */
  String encrypt(String rawPassword);
}
