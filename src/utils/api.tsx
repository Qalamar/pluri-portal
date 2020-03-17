import axios from 'axios';

const studentsUrl = 'http://localhost:3000/students?'
const teachersUrl = 'http://localhost:3000/teachers?'

/** 
 * this function return a promise so you can deal with response as you like
*/
export  const addStudent = (fName : string, lName : string, dateOfBirth : string, placeOfBirth : string, email : string, userName : string, password : string, promotion : string) => {
    // the  id will be generated automatically  by json-server
    let url = studentsUrl;
    const student = {
        firstName: fName,
        lastLame: lName,
        dateOfBirth : dateOfBirth,
        placeOfBirth : placeOfBirth,
        email : email,
        userName : userName,
        password : password,
        promotion : promotion
    };
    
    return axios.post(url, student);
}

/* 
    notice that the parametere is optional 
    if no paramateres are provided it will fetch all students
    it works with reguler expresions ie : you need to provide the full name or just PART OF IT 
    ---------starts with first name-------------------- 
    the functions returns a promise so you can manage the response as you like
*/
export const getStudents = (fullName? : string) => {
    let url = studentsUrl;
    let fName, lName;
    if(fullName) {
        const s : string[] = fullName.split(" ");
        if(s[0])  {
            fName = s[0];
            url += `firstName_like=${fName}&`;
        }
        if(s[1])  {
            lName = s[1];
            url += `lastName_like=${lName}&`;
        }
    } 

    return axios.get(url);
}

//same as addStudent
export const addTeacher = (fName : string, lName : string, dateOfBirth : string, placeOfBirth : string, email : string, userName : string, password : string, grade : string, specialty : string) => {
    let url = teachersUrl;
    //the id will be generated automatically
    const teacher = {
        
        firstName: fName,
        lastLame: lName,
        dateOfBirth : dateOfBirth,
        placeOfBirth : placeOfBirth,
        email : email,
        userName : userName,
        password : password,
        grade : grade,
        specialty : specialty
    }

    return axios.post(url, teacher);
}

//same as getStudent
export const getTeachers = (fullName? : string) => {
    let url = teachersUrl;
    let fName, lName;
    if(fullName) {
        const s : string[] = fullName.split(" ");
        if(s[0])  {
            fName = s[0];
            url += `firstName_like=${fName}&`;
        }
        if(s[1])  {
            lName = s[1];
            url += `lastName_like=${lName}&`;
        }
    } 

    return axios.get(url);
}