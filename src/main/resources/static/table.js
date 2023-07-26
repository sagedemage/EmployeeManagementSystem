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
            }
            else {
                console.log(response.json())
                location.reload();
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}

async function addEmployee() {
    // curl localhost:8080/employee/add -d name=Bob -d email=bob@email.com -d phone_number=1234562341
}