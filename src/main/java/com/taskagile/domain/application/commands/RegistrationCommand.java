package com.taskagile.domain.application.commands;

public class RegistrationCommand {
  // 읽기 전용으로 생성 후 상태변경 불가능
  // 애플리케이션 서비스의 클라이언트가 활용함-> 애클리케이션 코어에서는 사용하지 않음.
  private String username;
  private String emailAddress;
  private String password;

  public RegistrationCommand(String username, String emailAddress, String password) {
    this.username = username;
    this.emailAddress = emailAddress;
    this.password = password;
  }

  public String getUsername() {
    return username;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public String getPassword() {
    return password;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    RegistrationCommand that = (RegistrationCommand) obj;
    if (username != null ? !username.equals(that.username) : that.username != null) return false;
    if (emailAddress != null ? !emailAddress.equals(that.emailAddress) : that.emailAddress != null) return false;
    return password != null ? password.equals(that.password) : that.password == null;
  }

  @Override
  public int hashCode() {
    int result = username != null ? username.hashCode() : 0;
    result = 31 * result + (emailAddress != null ? emailAddress.hashCode() : 0);
    result = 31 * result + (password != null ? password.hashCode() : 0);
    return result;
  }

  @Override
  public String toString() {
    return "RegistrationCommand{" +
      "username='" + username + '\'' +
      ", emailAddress='" + emailAddress + '\'' +
      ", password='" + password + '\'' +
      '}';
  }



}
