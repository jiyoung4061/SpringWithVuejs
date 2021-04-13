package com.taskagile.web.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.taskagile.domain.application.commands.RegistrationCommand;

// 필드의 제약조건 정의
public class RegistrationPayload {
  // @Size가 null값을 유효한 값으로 인정해줌 => @NotNull 필수!
  @Size(min=2, max=50, message="Username must be between 2 and 50 characters")
  @NotNull
  private String username;

  public RegistrationCommand toCommand() {
    return new RegistrationCommand(this.username, this.emailAddress, this.password);
  }

  @Email(message = "Email address should be valid")
  @Size(max=100, message="Email address must not be more than 100 characters")
  @NotNull
  private String emailAddress;

  @Size(min=6, max= 30, message = "Password must be between 6and 30 characters")
  @NotNull
  private String password;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}
