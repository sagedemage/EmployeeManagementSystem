async function deleteEmployee(id) {
    console.log("Delete");
    // curl -X DELETE localhost:8080/employee/delete -d id=53

    const delete_confirm = confirm("Are you sure you want to delete this employee?")

    if (delete_confirm === true) {
        axios.delete("/employee/delete?id=" + id)
            .then(function (response) {
                if (response.status === 400) {
                    console.log("Error: " + response.data.error);
                    console.log("Message: " + response.data.message);
                } else {
                    console.log(response);
                    location.reload();
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}

function addEmployee() {
    console.log("Add")
    // curl localhost:8080/employee/add

    let add_employee_data = document.forms["add_employee_form"]
    const employee_name = add_employee_data["name"].value;
    const employee_email = add_employee_data["email"].value;
    const employee_phone_number = add_employee_data["phone_number"].value;

    axios.post("/employee/add", {
        name: employee_name,
        email: employee_email,
        phone_number: employee_phone_number,
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}

function openModal() {
    var modal = document.getElementById("add_modal");
    modal.style.display = "block";
}

window.onclick = function (event) {
    var modal = document.getElementById("add_modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}