/* Building an Application with Spring Boot */

package com.example.EmployeeMgmtSystem;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

record addEmployee(String name, String email, String phone_number) {}

@SpringBootTest
@AutoConfigureMockMvc
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void fetchEmployee() throws Exception {
        this.mvc.perform(get("/employee/fetch?id=1"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("\"id\":1")));
    }

    @Test
    public void addEmployee() throws Exception {
        addEmployee body = new addEmployee("john", "john@email.com", "1112223333");

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(body);

        this.mvc.perform(post("/employee/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("\"status_type\":\"Success\"")));
    }
}
