package com.taskagile;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test") // spring에 테스트중인걸 알림
public class TaskAgileApplicationTests {

	@Test
	public void contextLoads() {
    
	}

}
