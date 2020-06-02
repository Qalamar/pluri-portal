import axios from "axios";

const url = "http://localhost:3000/";
const studentsUrl = "http://localhost:3000/student";
const teachersUrl = "http://localhost:3000/teacher";
const promotionUrl = "http://localhost:3000/promotion";
const teamUrl = "http://localhost:3000/team";
const invitesUrl = "http://localhost:3000/invites"; //all invites
const inviteUrl = "http://localhost:3000/invite"; //forinvitestudent
const invitedUrl = "http://localhost:3000/invited";

const apiUrl = "http://bragdonilyes.pythonanywhere.com/";
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
  currentYear: string,
  note : number
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
    currentYear: currentYear,
    note:note
  };

  return axios.post(url + "users/student/add", student);
};

export const modifyStudent = (
  id: number,
  fName: string,
  lName: string,
  birthday: Date,
  birthPlace: string,
  userName: string,
  password: string,
  email: string,
  promo: number,
  note: number
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
    note:note
  };

  return axios.put(url + "users/student/modify/" + id, student);
};

export const getStudents = () => {
  return axios.get(url + "users/students");
};

export const deleteStudent = (id: number) => {
  return axios.delete(url + "users/student/modify/" + id);
};

export const addTeacher = (
  fName: string,
  lName: string,
  userName: string,
  password: string,
  email: string,
  birthday : Date,
  birthPlace: string,
  speciality: string,
  grade: string,
  currentYear: string
) => {
  //the id will be generated automatically
  const teacher = {
    firstName: fName,
    lastName: lName,
    userName: userName,
    password: password,
    email: email,
    birthday : birthday,
    birthPlace: birthPlace,
    speciality: speciality,
    grade: grade,
    currentYear: currentYear,
  };

  return axios.post(url + "users/professor/add", teacher);
};

export const modifyTeacher = (
  id: number,
  fName: string,
  lName: string,
  userName: string,
  password: string,
  email: string,
  birthday : Date,
  birthPlace: string,
  speciality: string,
  grade: string,
  currentYear: string
) => {
  const teacher = {
    firstName: fName,
    lastName: lName,
    userName: userName,
    password: password,
    email: email,
    birthday : birthday,
    birthPlace: birthPlace,
    speciality: speciality,
    grade: grade,
    currentYear: currentYear,
  };

  return axios.put(url + "users/professor/modify/" + id, teacher);
};

export const getTeachers = () => {
  return axios.get(url + "users/professors");
};

export const deleteTeacher = (id: number) => {
  return axios.delete(url + "users/professor/modify/" + id);
};

export const getPromotions = () => {
  return axios.get(url + "promo/promos");
};

export const addPromotionTest = (
  cycle: string,
  year: string,
  speciality: string,
  description: string,
  minTeamMembers : number,
  maxTeamMembers : number,
  maxProjects:number
) => {
  const promotion = {
    cycle: cycle,
    year: year,
    speciality: speciality,
    description: description,
    minTeamMembers : minTeamMembers,
    maxTeamMembers : maxTeamMembers,
    maxProjects:maxProjects
  };

  return axios.post(apiUrl + "promo/add/", promotion);
};

export const addPromotion = (
  cycle: string,
  year: string,
  specialty: string,
  description: string,
  minTeamMembers : number,
  maxTeamMembers : number,
  maxProjects:number
) => {
  const promotion = {
    cycle: cycle,
    year: year,
    speciality: specialty,
    description: description,
    minTeamMembers : minTeamMembers,
    maxTeamMembers : maxTeamMembers,
    maxProjects:maxProjects
  };

  return axios.post(url + "promo/add", promotion);
};

export const modifyPromotion = (
  Id: number,
  cycle: string,
  year: string,
  specialty: string,
  description: string,
  minTeamMembers : number,
  maxTeamMembers : number,
  maxProjects:number
) => {
  const promotion = {
    cycle: cycle,
    year: year,
    speciality: specialty,
    description: description,
    minTeamMembers : minTeamMembers,
    maxTeamMembers : maxTeamMembers,
    maxProjects:maxProjects
  };

  return axios.put(url + "promo/modify/" + Id, promotion);
};

export const deletePromotion = (id: number) => {
  return axios.delete(url + "promo/modify/" + id);
};
export const getTeams = () => {
  return axios.get(teamUrl);
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
export const addTeam = (nm: string, rd: boolean) => {
  const Team = {
    name: nm,
    readiness: rd,
  };
  return axios.post(teamUrl, Team);
};
export const modifyTeam = (Id: number, nm: string, rd: boolean) => {
  const Team = {
    id: Id,
    name: nm,
    readiness: rd,
  };
  return axios.put(teamUrl + "/" + Id, Team);
};

export const deleteTeam = (id: number) => {
  return axios.delete(teamUrl + "/" + id);
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
export const getStudentspromo = () => {
  let url = apiUrl + "users/students";
  return axios.get(url);
};
export const getMembersTeam = (id: number) => {
  let url = apiUrl + "users/team/" + id;
  return axios.get(url);
};
/* Invite student post +get */
export const postInviteStudent = (id: number) => {
  let url = inviteUrl + id;
  return axios.post(url);
};
export const getInviteStudent = (id: number) => {
  let url = +"users/invite/" + id.toString();
  return axios.get(url);
};
/* return:All invites sent to the member who issued the request */
export const getInvited = () => {
  return axios.get(invitedUrl);
};
export const getInvite = (idInv: number) => {
  let url = invitesUrl + idInv;
  return axios.get(url);
};
export const modifyInvite = (
  idInv: number,
  idSender: number,
  idReceiver: number,
  accept: boolean,
  reject: boolean
) => {
  const invite = {
    id: idInv,
    sender: idSender,
    receiver: idReceiver,
    acc: accept,
    rej: reject,
  };
  let url = invitesUrl + idInv;
  return axios.put(url, invite);
};
