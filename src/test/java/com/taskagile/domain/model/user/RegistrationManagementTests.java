package com.taskagile.domain.model.user;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

import com.taskagile.domain.security.PasswordEncryptor;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InOrder;

public class RegistrationManagementTests {
  private RegistrationManagement instance;
  private UserRepository repositoryMock;
  private PasswordEncryptor passwordEncrypterMock;

  @Before
  public void setUp() {
    repositoryMock = mock(UserRepository.class);
    passwordEncrypterMock = mock(PasswordEncryptor.class);
    instance = new RegistrationManagement(repositoryMock, passwordEncrypterMock);
  }

  @Test(expected = UsernameExistsException.class)
  public void register_existedUsername_shouldFail() throws RegistrationException {
    String username = "existUsername";
    String emailAddress = "sunny@taskagile.com";
    String password = "MyPassword!";

    // 이미 존재하는 사용자임을 알려주고자 빈 객체 반환
    when(repositoryMock.findByUsername(username)).thenReturn(new User());
    instance.register(username, emailAddress, password);
  }

  @Test(expected = EmailAddressExistsException.class)
  public void register_existedEmailAddress_shouldFail() throws RegistrationException {
    String username = "sunny";
    String emailAddress = "exist@taskagile.com";
    String password = "MyPassword!";

    when(repositoryMock.findByEmailAddress(emailAddress)).thenReturn(new User());
    instance.register(username, emailAddress, password);
  }

  @Test
  public void register_uppercaseEmailAddress_shouldSucceedAndBecomeLowercase() throws RegistrationException{
    String username = "sunny";
    String emailAddress = "Sunny@TaskAgile.com";
    String password = "MyPassword!";

    instance.register(username, emailAddress, password);
    User userToSave = User.create(username, emailAddress.toLowerCase(), password);
    verify(repositoryMock).save(userToSave);
  }

  @Test
  public void register_newUser_shouldSucceed() throws RegistrationException {
    String username = "sunny";
    String emailAddress = "sunny@taskagile.com";
    String password = "MyPassword!";
    String encryptedPassword = "EncryptedPassword";
    User newUser = User.create(username, emailAddress, encryptedPassword);

    // repository 목 설정
    // 사용자가 존재하지 않음을 나타내는 null값 반환
    when(repositoryMock.findByUsername(username)).thenReturn(null);
    when(repositoryMock.findByEmailAddress(emailAddress)).thenReturn(null);
    doNothing().when(repositoryMock).save(newUser);
    // passwordEncryptor 목 설정
    when(passwordEncrypterMock.encrypt(password))
      .thenReturn("EncryptedPassword");

    User savedUser = instance.register(username, emailAddress, password);

    // 순서대로 호출되는지 검증(InOrder 사용)
    InOrder inOrder = inOrder(repositoryMock);
    inOrder.verify(repositoryMock).findByUsername(username);
    inOrder.verify(repositoryMock).findByEmailAddress(emailAddress);
    inOrder.verify(repositoryMock).save(newUser);

    // encrypt() 메소드 호출 검증
    verify(passwordEncrypterMock).encrypt(password);
    // 저장된 비밀번호가 암호화된것인지 검증
    assertEquals("Saved user's password should be encrypted", encryptedPassword, savedUser.getPassword());
  }
}
