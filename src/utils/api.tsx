import axios from "axios";

const url = "http://localhost:3000/";
const studentsUrl = "http://localhost:3000/student";
const teachersUrl = "http://localhost:3000/teacher";
const promotionUrl = "http://localhost:3000/promotion";
const specialtyUrl = "http://localhost:3000/specialty";
/**
 * this function return a promise so you can deal with response as you like
 */
export const addStudent = (
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  promotion: string
) => {
  // the  id will be generated automatically  by json-server
  const student = {
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    promotion: promotion,
  };

  return axios.post(studentsUrl, student);
};

export const modifyStudent = (
  id: number,
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  promotion: string
) => {
  let student = {
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    promotion: promotion,
  };
  return axios.put(studentsUrl + "/" + id, student);
};

/* 
    notice that the parametere is optional 
    if no paramateres are provided it will fetch all students
    it works with reguler expresions ie : you need to provide the full name or just PART OF IT 
    ---------starts with first name, and use one blank as seperation-------------------- 
    the functions returns a promise so you can manage the response as you like
*/
export const getStudents = () => {
  let url = studentsUrl + "?";

  return axios.get(url);
};

export const deleteStudent = (id: number) => {
  return axios.delete(studentsUrl + "/" + id);
};

//same as addStudent
export const addTeacher = (
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  grade: string,
  specialty: string
) => {
  //the id will be generated automatically
  const teacher = {
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    grade: grade,
    specialty: specialty,
  };

  return axios.post(teachersUrl, teacher);
};

export const modifyTeacher = (
  id: number,
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  grade: string,
  specialty: string
) => {
  let teacher = {
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    grade: grade,
    specialty: specialty,
  };

  return axios.put(teachersUrl + "/" + id, teacher);
};

//same as getStudent
export const getTeachers = () => {
  let url = teachersUrl + "?";

  return axios.get(url);
};

export const deleteTeacher = (id: number) => {
  return axios.delete(teachersUrl + "/" + id);
};

export const getPromotions = () => {
  return axios.get(promotionUrl);
};

export const addPromotion = (
  cP: string,
  c: string,
  d :stringl,
  l: string,
  aY: string,
  sC: string
) => {
  const promotion = {
    codePromotion: cP,
    description:d,
    cycle: c,
    level: l,
    academicYear: aY,
    specialtyCode: sC,
  };
};
/*
  return axios.post(promotionUrl, promotion);
 
  export const addPromotion = (
  Id :number,
  cP: string,
  c: string,
  l: string,
  aY: string ,
  sC: string
) => {
  const promotion = {
    id: Id,
    codePromotion: cP,
    cycle: c,
    level: l,
    academicYear: aY,
    specialityCode: sC
  };

  return axios.post(promotionUrl, promotion);
};

export const modifyPromotion = (
  Id: number,
  cP: string,
  c: string,
  l: string,
  aY: string,
  sC: string
) => {
  const promotion = {
    id :Id,
    codePromotion: cP,
    cycle: c,
    level: l,
    academicYear: aY,
    specialityCode: sC
  };

  return axios.put(promotionUrl + "/" + Id, promotion);
};

*/
export const modifyPromotion = (
  id: number,
  cP: string,
  d: string,
  c: string,
  l: string,
  aY: string,
  sC: string
) => {
  const promotion = {
    codePromotion: cP,
    description:d,
    cycle: c,
    level: l,
    academicYear: aY,
    specialtyCode: sC,
  };

  return axios.put(promotionUrl + "/" + id, promotion);
};

export const deletePromotion = (id: number) => {
  return axios.delete(promotionUrl + "/" + id);
};

export const getSpecialties = () => {
  return axios.get(specialtyUrl);
};

export const addSpecialty = (sC: number, sN: string, d: string) => {
  const specialty = {
    specialtyCode: sC,
    specialtyName: sN,
    description: d,
  };

  return axios.post(specialtyUrl, specialty);
};

export const modifySpecialty = (
  id: number,
  sC: number,
  sN: string,
  d: string
) => {
  const specialty = {
    specialtyCode: sC,
    specialtyName: sN,
    description: d,
  };

  return axios.put(specialtyUrl + "/" + id, specialty);
};

export const deleteSpecialty = (id: number) => {
  return axios.delete(specialtyUrl + "/" + id);
};

export const register = (email: string, password: string) => {
  const newUser = {
    email: email,
    password: password,
  };

  return axios({
    method: "POST",
    url: url + "register",
    data: newUser,
  });
};

// this function (if successful) will return an accessToken property in reponse.data (expiration 1 hour)
export const login = (email: string, password: string) => {
  const login = {
    email: email,
    password: password,
  };

  //TODO : the url will be changed when integrating with the real backend
  return axios({
    method: "POST",
    url: url + "login",
    data: login,
  });
};
