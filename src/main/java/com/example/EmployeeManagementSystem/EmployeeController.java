/* Accessing data with MySQL */

package com.example.EmployeeManagementSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
//import org.springframework.stereotype.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    //@RequestMapping(path="/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(path="/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Status addNewEmployee(@RequestBody EmployeeBody employeeBody) {
        // name, email, phone_number
        // Create
        Employee n = new Employee();

        if (employeeBody.getName() == null) {
            return new Status("Name is empty");
        }
        else if (employeeBody.getEmail() == null) {
            return new Status("Email is empty");
        }
        else if (employeeBody.getPhone_number() == null) {
            return new Status("Phone number is empty");
        }

        n.setName(employeeBody.getName());
        n.setEmail(employeeBody.getEmail());
        n.setPhone_number(employeeBody.getPhone_number());
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
        employee.setPhone_number(phone_number);
        employeeRepository.save(employee);
        return new Status("Updated");
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Employee> getAllEmployees() {
        // Read
        return employeeRepository.findAll();
    }

    @GetMapping(path = "/table")
    public @ResponseBody Status fetchEmployees(Model model) {
        Iterable<Employee> employees = employeeRepository.findAll();
        model.addAttribute("employees", employees);
        return new Status("Fetched");
    }
}
