/* Accessing Employee data from MySQL database */

package com.example.EmployeeMgmtSystem;

import org.springframework.data.repository.CrudRepository;

/* This will be AUTO IMPLEMENTED by Spring into a Bean called employeeRepository
 * CRUD (Create, Read, Update, Delete)
 */

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {}
