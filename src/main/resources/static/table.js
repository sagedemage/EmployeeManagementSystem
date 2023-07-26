async function deleteEmployee(id) {
    console.log("Delete");
    // curl -X DELETE localhost:8080/employee/delete -d id=53

    // http://localhost:8080/spring-mvc-basics/api/foos?id=abc

    const url = "/employee/delete?id=" + id;

    const delete_confirm = confirm("Are you sure you want to delete this employee?")

    if (delete_confirm === true) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async (response) => {
            if (response.status === 400) {
                const response_body = await response.json()
                console.log("Error: " + response_body.error);
                console.log("Message: " + response_body.message);
            } else {
                console.log(response.json())
                location.reload();
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

function addEmployee() {
    // curl localhost:8080/employee/add

    const url = "/employee/add";

    let add_employee_data = document.forms["add_employee_form"]
    const employee_name = add_employee_data["name"].value;
    const employee_email = add_employee_data["email"].value;
    const employee_phone_number = add_employee_data["phone_number"].value;

    axios.post("/employee/add", {
        name: employee_name,
        email: employee_email,
        phone_number: employee_phone_number,
    }).then(function (response) {
        console.log(response)
    }).catch(function (error) {
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