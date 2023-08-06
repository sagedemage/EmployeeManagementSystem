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

        console.log(response.data)

        const data = response.data;

        return { data }
    },
    template: /*html*/`
        <h1>Employee Table</h1>
        <p>This is the home page</p>
         <table>
      <button>Add Employee</button>
      <li v-for="employee in data">
        {{ employee }}
      </li>
      <br>
      <br>
      <br>
      <br>
      <br>
      <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th></th>
      </tr>
      <tr>
          <td />
          <td />
          <td />
          <td />
          <td>
              <button>Edit</button>
              <button>Delete</button>
          </td>
      </tr>
  </table>
    `
}