import axios from "axios";
import { store } from "../stores/Store";

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
  note: number
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
    note: note,
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
  isLeader: boolean,
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
    note: note,
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
  birthday: Date,
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
    birthday: birthday,
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
  birthday: Date,
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
    birthday: birthday,
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
  return axios.get(url + "/promos");
};

export const userLogin = async (email: string, password: string) => {
  try {
    const res = await axios.post(apiUrl + "users/login/", {
      headers: {
        "Content-Type": "application/json",
      },
      email: email,
      password: password,
    });
    // .then();
    console.log(res.data);
    localStorage.setItem("Token", JSON.stringify(res.data));
    store.isAuth.state = true;
    // Check permissions from the token
    switch (res.data.token.slice(-1)) {
      case "0":
        store.isAuth.access = "0";
        break;
      case "1":
        store.isAuth.access = "1";
      default:
        store.isAuth.access = "2";
        break;
    }
    store.isAuth.token = res.data.token;
    store.isAuth.id = res.data.userId;

    localStorage.setItem("Auth", JSON.stringify(store.isAuth));
    window.location.reload();
  } catch (error) {
    return console.log(error.response.request);
  }
};

export const addPromotion = async (
  cycle: string,
  year: string,
  specialityName: string,
  description: string,
  minTeamMembers: number,
  maxTeamMembers: number,
  maxTeamsInProject: number
) => {
  try {
    const res = await axios.post(apiUrl + "promo/add/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${store.isAuth.token}`,
      },
      cycle: cycle,
      year: year,
      specialityName: specialityName,
      description: description,
      minTeamMembers: minTeamMembers,
      maxTeamMembers: maxTeamMembers,
      maxTeamsInProject: maxTeamsInProject,
    });
    // .then();
    console.log(res.data);
  } catch (error) {
    return console.log(error.response.request);
  }
};

export const modifyPromotion = (
  Id: number,
  d: string,
  c: string,
  l: string,
  sC: string,
  minT: number,
  maxT: number,
  maxP: number
) => {
  const promotion = {
    description: d,
    cycle: c,
    year: l,
    specialityName: sC,
    minTeamMembers: minT,
    maxTeamMembers: maxT,
    maxProjects: maxP,
  };
  modifyPromotionSetup(Id, minT, maxT, maxP);
  return axios.put(url + "promo/" + Id, promotion);
};
export const modifyPromotionSetup = (
  Id: number,
  minT: number,
  maxT: number,
  maxP: number
) => {
  const promotion = {
    minTeamMembers: minT,
    maxTeamMembers: maxT,
    maxProjects: maxP,
  };
  return axios.put(url + "promo/" + Id, promotion);
};
export const deletePromotion = (id: number) => {
  return axios.delete(url + "promo/" + id);
};
/**************************************************************/

export const getTeams = () => {
  return axios.get(url + "/users/team");
};
export const getTeam = (id: number) => {
  return axios.get(url + "/users/team/" + id);
};
export const addTeam = (nm: string) => {
  let team = {
    name: nm,
  };
  return axios.post(url + "/users/team", team);
};
export const ValidateTeam = (idTeam: number) => {
  return axios.post(url + "/users/validate/" + idTeam, true);
};
export const getMembersTeam = (id: number) => {
  return axios.get(url + "/users/team/" + id);
};
/* export const deleteTeam=(id:number)=>{
    return axios.delete(url+'users/team/'+id);
  };*/

/*****************************************************/
export const getStudentspromo = () => {
  return axios.get(url + "/users/students");
};
/********************************************* */
export const postInviteStudent = (id: number) => {
  //Id receiver

  return axios.post(url + "/users/student/invite/" + id);
};
export const getStudentInvited = (idStudent: number) => {
  return axios.get(url + "/users/student/invite/" + idStudent);
};
export const getInvited = () => {
  return axios.get(url + "/users/invited");
};
export const getInvite = (idInv: number) => {
  return axios.get(url + "/users/invites/" + idInv);
};
export const modifyInvite = (
  idInv: number,
  idSender: number,
  idReceiver: number,
  accept: boolean,
  reject: boolean
) => {
  const invite = {
    sender: idSender,
    receiver: idReceiver,
    accepted: accept,
    rejected: reject,
  };

  return axios.put(url + "/users/invites/" + idInv, invite);
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
export const addProject = (
  title: string,
  domain: string,
  tools: string,
  requiredDoc: string,
  document: FormData
) => {
  const project = {
    title: title,
    domain: domain,
    tools: tools,
    requiredDocuments: requiredDoc,
    document: document,
  };
  return axios.post(url + "/pfe/add/", project);
};
export const getProjects = () => {
  return axios.get(url + "/pfe/projects");
};
export const getProject = (id: number) => {
  return axios.get(url + "/pfe/modify/" + id);
};
export const modifyProject = (
  id: number,
  title: string,
  domain: string,
  tools: string,
  requiredDoc: string,
  document: FormData
) => {
  let project = {
    title: title,
    domain: domain,
    tools: tools,
    requiredDocuments: requiredDoc,
    document: document,
  };
  return axios.put(url + "/pfe/modify/" + id, project);
};
export const deleteProject = (id: number) => {
  return axios.delete(url + "/pfe/modify/" + id);
};
export const AccRejProject = (id: number, status: string) => {
  return axios.put(url + "/pfe/evaluate/" + id, status);
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
