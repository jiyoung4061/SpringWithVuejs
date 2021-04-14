package com.taskagile.web.pages;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

  // 스프링mvc 컨트롤러에 경로 매핑하도록 핸들러 추가
  @GetMapping(value = { "/", "/login" })
  public String entry() {
    return "index";
  }

}
