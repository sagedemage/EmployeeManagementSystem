/* Accessing data with MySQL */

package com.example.EmployeeManagementSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
//import org.springframework.stereotype.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(path="/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    //@RequestMapping(path="/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public MessageStatus addNewEmployee(@RequestBody EmployeeBody employeeBody) {
        // name, email, phone_number
        // Create
        Employee n = new Employee();

        if (employeeBody.getName() == null) {
            return new MessageStatus("Error", "Name is empty");
        }
        else if (employeeBody.getEmail() == null) {
            return new MessageStatus("Error", "Email is empty");
        }
        else if (employeeBody.getPhone_number() == null) {
            return new MessageStatus("Error", "Phone number is empty");
        }

        n.setName(employeeBody.getName());
        n.setEmail(employeeBody.getEmail());
        n.setPhone_number(employeeBody.getPhone_number());
        employeeRepository.save(n);
        return new MessageStatus("Success", "Added");
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody MessageStatus removeEmployee(@RequestParam int id) {
        // Delete
        employeeRepository.deleteById(id);
        return new MessageStatus("Success", "Deleted");
    }

    @PatchMapping(path="/update")
    public @ResponseBody MessageStatus updateEmployee(@RequestBody EmployeeBody employeeBody) {
        // Update
        Employee employee = employeeRepository.findById(employeeBody.getId()).get();
        employee.setName(employeeBody.getName());
        employee.setEmail(employeeBody.getEmail());
        employee.setPhone_number(employeeBody.getPhone_number());
        employeeRepository.save(employee);
        return new MessageStatus("Success", "Updated");
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Employee> getAllEmployees() {
        // Read
        return employeeRepository.findAll();
    }

    @GetMapping(path = "/table")
    public @ResponseBody MessageStatus fetchEmployees(Model model) {
        Iterable<Employee> employees = employeeRepository.findAll();
        model.addAttribute("employees", employees);
        return new MessageStatus("Success", "Fetched");
    }
}
