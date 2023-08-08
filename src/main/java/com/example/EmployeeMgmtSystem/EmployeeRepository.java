/*
 * Accessing Employee data from the MySQL database
 */

package com.example.EmployeeMgmtSystem;

import org.springframework.data.repository.CrudRepository;

/* Creates a repository that holds employee records */
// Spring automatically implements this repository interface in a bean called employeeRepository

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {}
