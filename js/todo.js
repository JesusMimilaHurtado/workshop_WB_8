function getQueryParam(param)
{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

function getData(){
    
    const endpoint = getQueryParam('id');

    fetch('http://localhost:8090/api/courses/' + endpoint)
    .then(response => response.json())
    .then(data => { 
            const info =`    
            <strong> Id </strong>: ${data.id}
            <strong> Department </strong>: ${data.dept}
            <strong> Course Number </strong>: ${data.courseNum}
            <strong> Course Name </strong>: ${data.courseName}
            <strong> Instructor </strong>: ${data.instructor}
            <strong> Start Date </strong>: ${data.startDate}
            <strong> Number of Days </strong>:&nbsp${data.numDays}`
            courseInfo.innerHTML = info
        
    })
    .catch((error) => console.error(error));
};

function deleteCourse(){

    const endpoint = getQueryParam('id');
    const urlencoded = new URLSearchParams();

    fetch('http://localhost:8090/api/courses/' + endpoint)
    .then(response => response.json())
    .then(data => {

        urlencoded.append("id", data.id)
        urlencoded.append("dept", data.dept);
        urlencoded.append("courseNum", data.courseNum);
        urlencoded.append("courseName", data.courseName);
        urlencoded.append("instructor", data.instructor);
        urlencoded.append("startDate", data.startDate);
        urlencoded.append("numDays", data.numDays);})

    .catch((error) => console.error(error));

    const requestOptions = {
        method: "DELETE",
        body: urlencoded,
        redirect: "follow"
    };

    fetch('http://localhost:8090/api/courses/' + endpoint, requestOptions)
    .then(response => response.json())
    .then(data => data)
    .catch((error) => console.error(error));
   
};