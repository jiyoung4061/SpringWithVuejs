package com.taskagile.web.apis;

import javax.validation.Valid;

import com.taskagile.domain.application.UserService;
import com.taskagile.domain.model.user.EmailAddressExistsException;
import com.taskagile.domain.model.user.RegistrationException;
import com.taskagile.domain.model.user.UsernameExistsException;
import com.taskagile.web.payload.RegistrationPayload;
import com.taskagile.web.results.ApiResult;
import com.taskagile.web.results.Result;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class RegistrationApiController {
  private UserService service; // 사용자가 등록할 때 활용하는 register(RegistrationCommand) API 제공
  // register API : 성공시 반환X , 실패시 RegistrationException 던짐.

  public RegistrationApiController(UserService service) {
    this.service = service;
  }

  @PostMapping("/api/registrations")
  public ResponseEntity<ApiResult> register( @Valid @RequestBody RegistrationPayload payload ){
    // @Valid : register()메소드에 데이터를 전달하기 전에 데이터 검증(RegistrationPayload)를 수행해 유효성을 검사한다.
    try {
      service.register(payload.toCommand());
      // payload.toCommand() : RegistrationPayload 인스턴스를 RegistrationCommand클래스로 변환
      // RegistrationCommand클래스의 인스턴스와 함께 서비스 API 호출.

      return Result.created();
    } catch (RegistrationException e) {
      String errorMessage = "Registration failed";
      if (e instanceof UsernameExistsException) {
        errorMessage = "Username already exists";
      } else if (e instanceof EmailAddressExistsException) {
        errorMessage = "Email address already exists";
      }
      return Result.failure(errorMessage);
    }
  }
}
