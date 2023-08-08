/*
 * Table Page
 */

import { ref } from 'vue'

export default {
    async setup() {
        const response = await axios.get("/employee/fetch-all")

        const employees = response.data;

        let employee_id = ref(0);

        /* Add employee state */
        let add_employee_name = ref("");
        let add_employee_email = ref("");
        let add_employee_phone_number = ref("");

        /* Edit employee state */
        let edit_employee_name = ref("");
        let edit_employee_email = ref("");
        let edit_employee_phone_number = ref("");

        console.log(employees)

        window.onclick = function (event) {
            /* Handle closing an open modal */
            let add_modal = document.getElementById("add_modal");
            if (event.target == add_modal) {
                add_modal.style.display = "none";
            }

            let edit_modal = document.getElementById("edit_modal");
            if (event.target == edit_modal) {
                edit_modal.style.display = "none";
            }
        }

        return { employees, employee_id,
            add_employee_name, add_employee_email, add_employee_phone_number,
            edit_employee_name, edit_employee_email, edit_employee_phone_number,
        }
    },
    methods: {
        /* Employee CRUD operations */
        addEmployee() {
            /* Add Employee (CREATE) */
            axios.post("/employee/add", {
                name: this.add_employee_name,
                email: this.add_employee_email,
                phone_number: this.add_employee_phone_number,
            })
            .then((response) => {
                console.log(response.data)
                location.reload();
            })
            .catch((error) => {
                console.log(error)
            })
        },
        fetchEmployee(employee_id) {
            /* Fetch employee data (READ) */
            axios.get("/employee/fetch?id=" + employee_id)
                .then((response) => {
                    console.log(response.data)
                    this.edit_employee_name = response.data.name;
                    this.edit_employee_email = response.data.email;
                    this.edit_employee_phone_number = response.data.phone_number;
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        editEmployee() {
            /* Edit employee data (UPDATE) */
            axios.patch("/employee/update", {
                id: this.employee_id,
                name: this.edit_employee_name,
                email: this.edit_employee_email,
                phone_number: this.edit_employee_phone_number,
            })
                .then((response) => {
                    console.log(response.data)
                    location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        deleteEmployee(employee_id) {
            /* Delete employee (DELETE) */
            const delete_confirm = confirm("Are you sure you want to delete this employee?")

            if (delete_confirm === true) {
                axios.delete("/employee/delete?id=" + employee_id)
                    .then((response) => {
                        if (response.status === 400) {
                            console.log("Error: " + response.data.error);
                            console.log("Message: " + response.data.message);
                        } else {
                            console.log(response.data)
                            location.reload();
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        /* Modal GUI */
        openAddModal() {
            /* Open modal containing a form to add an employee */
            let modal = document.getElementById("add_modal");
            modal.style.display = "block";
        },
        openEditModal(employee_id) {
            /* Open modal containing a form to edit an employee */
            if (employee_id !== 0) {
                this.employee_id = employee_id
            }

            let modal = document.getElementById("edit_modal");
            modal.style.display = "block";

            this.fetchEmployee(this.employee_id)
        },
    },
    template: /*html*/`
        <h1>Employee Table</h1>
        <p>This is the home page</p>
        <button v-on:click="openAddModal()">Add Employee</button>
        <table>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th></th>
            <tr v-for="employee in employees">
                <td>{{ employee.name }}</td> 
                <td>{{ employee.email }}</td> 
                <td>{{ employee.phone_number }}</td>
                <td>
                    <button v-on:click="openEditModal(employee.id)">Edit</button>
                    <button class="danger_button" v-on:click="deleteEmployee(employee.id)">Delete</button>
                </td>
            </tr>
        </table>
        
        <!-- Add modal -->
        <div id="add_modal" class="modal">
            <div class="modal_content">
                <b>Add Employee</b>
                <form action="#" name="add_employee_form">
                    <label for="add_name">Name:</label><br>
                    <input v-model="add_employee_name" type="text" id="add_name" name="name"><br>
                    <label for="add_email">Email</label><br>
                    <input v-model="add_employee_email" type="text" id="add_email" name="email"><br>
                    <label for="add_phone_number">Phone number</label><br>
                    <input v-model="add_employee_phone_number" type="text" id="add_phone_number" name="phone_number"><br>
                    <br>
                    <button type="button" v-on:click="addEmployee()">Submit</button>
                </form>
            </div>
        </div>
        
        <!-- Edit Modal -->
        <div id="edit_modal" class="modal">
            <div class="modal_content">
                <b>Edit Employee</b>
                <form action="#" name="edit_employee_form">
                    <label for="add_name">Name:</label><br>
                    <input v-model="edit_employee_name" type="text" id="edit_name" name="name"><br>
                    <label for="add_email">Email</label><br>
                    <input v-model="edit_employee_email" type="text" id="edit_email" name="email"><br>
                    <label for="add_phone_number">Phone number</label><br>
                    <input v-model="edit_employee_phone_number" type="text" id="edit_phone_number" name="phone_number"><br>
                    <br>
                    <button type="button" v-on:click="editEmployee()">Submit</button>
                </form>
            </div>
        </div>
    `
}