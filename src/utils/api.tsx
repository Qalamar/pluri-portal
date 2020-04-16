import axios from "axios";

const url = "http://localhost:3000/";
const studentsUrl = "http://localhost:3000/student";
const teachersUrl = "http://localhost:3000/teacher";
const promotionUrl = "http://localhost:3000/promotion";
const specialtyUrl = "http://localhost:3000/specialty";

const apiUrl = 'http://bragdonilyes.pythonanywhere.com/';
/**
 * these functions return a promise so you can deal with response as you like
 */
export const addStudent = (
  fName: string,
  lName: string,
  userName: string,
  password: string,
  email: string,
  birthday: Date,
  birthPlace: string,
  promo: number,
  currentYear : string
) => {
  // the  id will be generated automatically  by json-server
  const student = {
    firstName: fName,
    lastName: lName,
    username: userName,
    password: password,
    email: email,
    birthday: birthday,
    birthPlace: birthPlace,
    promo: promo,
    currentYear : currentYear
  };

  return axios.post(url+'users/student/add', student);
};

export const modifyStudent = (
  id : number,
  fName: string,
  lName: string,
  userName: string,
  password: string,
  email: string,
  birthday: Date,
  birthPlace: string,
  promo: number,
  currentYear : string
) => {
  const student = {
    firstName: fName,
    lastName: lName,
    username: userName,
    password: password,
    email: email,
    birthday: birthday,
    birthPlace: birthPlace,
    promo: promo,
    currentYear : currentYear
  };
   
  return axios.put(url+'users/student/modify/'+id, student);
}



export const getStudents = () => {

  return axios.get(url+'users/students');
};

export const deleteStudent = (id: number) => {
  return axios.delete(url+'users/student/modify/'+id);
};

export const addTeacher = (
  fName: string,
  lName: string,
  userName: string,
  password: string,
  email: string,
  birthPlace : string,
  speciality : string,
  grade : string,
  currentYear : string
) => {
  //the id will be generated automatically
  const teacher = {
    firstName: fName,
    lastName: lName,
    userName: userName,
    password: password,
    email: email,
    birthPlace: birthPlace,
    speciality: speciality,
    grade: grade,
    currentYear : currentYear
  };

  return axios.post(url+'users/professor/add', teacher);
};

export const modifyTeacher = (
  id : number,
  fName: string,
  lName: string,
  userName: string,
  password: string,
  email: string,
  birthPlace : string,
  speciality : string,
  grade : string,
  currentYear : string
) => {
  const teacher = {
    firstName: fName,
    lastName: lName,
    userName: userName,
    password: password,
    email: email,
    birthPlace: birthPlace,
    speciality: speciality,
    grade: grade,
    currentYear : currentYear
  };

  return axios.put(url+'users/professor/modify/'+id, teacher);
}

export const getTeachers = () => {

  return axios.get(url+'users/professors');
};

export const deleteTeacher = (id: number) => {
  return axios.delete(url+'users/professor/modify/'+id);
};

export const getPromotions = () => {
  return axios.get(url+'promo/promos');
};

export const addPromotionTest = (
  cycle : string,
  year : string,
  specialityName : string,
  description : string
  ) => {
  const promotion = {
    cycle : cycle,
    year : year,
    specialityName : specialityName,
    description : description
  };

  return axios.post(apiUrl+'promo/add/', promotion);
};


export const addPromotion = (
  cycle : string,
  year : string,
  specialityName : string,
  description : string
) => {
  const promotion = {
    cycle : cycle,
    year : year,
    specialityName : specialityName,
    description : description
  }

  return axios.post(url+'promo/add', promotion);
}
// export const addPromotion = (
//   cP: string,
//   c: string,
//   d: string,
//   l: string,
//   aY: string,
//   sC: string
// ) => {
//   const promotion = {
//     codePromotion: cP,
//     description: d,
//     cycle: c,
//     level: l,
//     academicYear: aY,
//     specialtyCode: sC,
//   };
// };
export const modifyPromotion = (
  id : number,
  cycle : string,
  year : string,
  specialityName : string,
  description : string
) => {
  const promotion = {
    cycle : cycle,
    year : year,
    specialityName : specialityName,
    description : description
  }

  return axios.put(url+'promo/modify/'+id, promotion);
};

export const deletePromotion = (id: number) => {
  return axios.delete(url+'promo/modify/'+id);
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
