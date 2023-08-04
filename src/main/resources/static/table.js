async function deleteEmployee(id) {
    // curl -X DELETE localhost:8080/employee/delete -d id=53
    const delete_confirm = confirm("Are you sure you want to delete this employee?")

    if (delete_confirm === true) {
        axios.delete("/employee/delete?id=" + id)
            .then(function (response) {
                if (response.status === 400) {
                    console.log("Error: " + response.data.error);
                    console.log("Message: " + response.data.message);
                } else {
                    console.log(response.data)
                    location.reload();
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}

function addEmployee() {
    // curl localhost:8080/employee/add
    let add_employee_data = document.forms["add_employee_form"]
    const employee_name = add_employee_data["add_name"].value;
    const employee_email = add_employee_data["add_email"].value;
    const employee_phone_number = add_employee_data["add_phone_number"].value;

    axios.post("/employee/add", {
        name: employee_name,
        email: employee_email,
        phone_number: employee_phone_number,
        })
        .then(function (response) {
            console.log(response.data)
            location.reload();
        })
        .catch(function (error) {
            console.log("Stack: " + error.stack);
            console.log("Message: " + error.message);
            console.log("Name: " + error.name);
            console.log("Code: " + error.code);
        })
}

function editOpenModal(employee_id) {
    localStorage.setItem("employee_id", employee_id)
    let modal = document.getElementById("edit_modal");
    modal.style.display = "block";

    let name = document.getElementById("edit_name");
    let email = document.getElementById("edit_email");
    let phone_number = document.getElementById("edit_phone_number");

    // fetch employee data
    axios.get("/employee/fetch?id=" + employee_id)
        .then(function (response) {
            console.log(response.data)
            name.value = response.data.name;
            email.value = response.data.email;
            phone_number.value = response.data.phone_number;
        })
        .catch(function (error) {
            console.log("Stack: " + error.stack);
            console.log("Message: " + error.message);
            console.log("Name: " + error.name);
            console.log("Code: " + error.code);
        })
}

function addOpenModal() {
    let modal = document.getElementById("add_modal");
    modal.style.display = "block";
}

function editEmployee() {
    let employee_id = parseInt(localStorage.getItem("employee_id"))
    let add_employee_data = document.forms["edit_employee_form"]
    const employee_name = add_employee_data["edit_name"].value;
    const employee_email = add_employee_data["edit_email"].value;
    const employee_phone_number = add_employee_data["edit_phone_number"].value;

    axios.patch("/employee/update", {
        id: employee_id,
        name: employee_name,
        email: employee_email,
        phone_number: employee_phone_number,
    })
        .then(function (response) {
            console.log(response.data)
            location.reload();
        })
        .catch(function (error) {
            console.log("Stack: " + error.stack);
            console.log("Message: " + error.message);
            console.log("Name: " + error.name);
            console.log("Code: " + error.code);
        })
}

window.onclick = function (event) {
    let add_modal = document.getElementById("add_modal");
    if (event.target == add_modal) {
        add_modal.style.display = "none";
    }

    let edit_modal = document.getElementById("edit_modal");
    if (event.target == edit_modal) {
        edit_modal.style.display = "none";
        localStorage.removeItem("employee_id");
    }
}