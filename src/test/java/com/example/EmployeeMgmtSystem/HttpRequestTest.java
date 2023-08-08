/* Test HTTP Request */

package com.example.EmployeeMgmtSystem;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.beans.factory.annotation.Value;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class HttpRequestTest {

    @Value(value = "${local.server.port}")
    private int port;

    @Autowired
    private TestRestTemplate template;

    @Test
    public void validateTitleTag() throws Exception {
        /* Test to validate the title tag is correct */
        assertThat(this.template.getForObject("http://localhost:" + port + "/", String.class))
                .contains("<title>EMS - Home</title>");
    }
}
