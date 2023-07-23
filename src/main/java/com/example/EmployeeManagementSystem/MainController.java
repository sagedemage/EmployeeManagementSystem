/* Accessing data with MySQL */

package com.example.EmployeeManagementSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/employee")
public class MainController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping(path="/add")
    public @ResponseBody Status addNewEmployee(@RequestParam String name, @RequestParam String email,
                                           @RequestParam String phone_number) {
        // Create
        Employee n = new Employee();
        n.setName(name);
        n.setEmail(email);
        n.setPhoneNumber(phone_number);
        employeeRepository.save(n);
        return new Status("Saved");
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody Status removeEmployee(@RequestParam int id) {
        // Delete
        employeeRepository.deleteById(id);
        return new Status("Deleted");
    }

    @PatchMapping(path="/update")
    public @ResponseBody Status updateEmployee(@RequestParam int id, @RequestParam String name,
                                               @RequestParam String email, @RequestParam String phone_number) {
        // Update
        Employee employee = employeeRepository.findById(id).get();
        employee.setName(name);
        employee.setEmail(email);
        employee.setPhoneNumber(phone_number);
        employeeRepository.save(employee);
        return new Status("Updated");
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Employee> getAllEmployees() {
        // Read
        return employeeRepository.findAll();
    }
}
