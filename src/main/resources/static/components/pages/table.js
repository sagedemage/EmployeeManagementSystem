import { ref } from 'vue'
export default {
    async setup() {
        /*
        const response = axios.get("/employee/fetch-all")
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log("Stack: " + error.stack);
                console.log("Message: " + error.message);
                console.log("Name: " + error.name);
                console.log("Code: " + error.code);
            })
        */

        const response = await axios.get("/employee/fetch-all")

        const employees = response.data;

        console.log(employees)

        return { employees }
    },
    template: /*html*/`
        <h1>Employee Table</h1>
        <p>This is the home page</p>
        <button>Add Employee</button>
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
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        </table>
    `
}