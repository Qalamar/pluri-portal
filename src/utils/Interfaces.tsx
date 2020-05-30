import React, { useState } from "react";

export interface Team {
  id: number,
  name: string,
  readiness: boolean
}
export interface TeamInterface {
  TeamIn: Team;
}
export interface NotificationInterface {
  Desciption: string,
  Icon: string
}

interface TeamState {
  Team: Team;
  setTeam: React.Dispatch<React.SetStateAction<Team>>;
}

export const useTeam = (overrides?: Partial<Team>): TeamState => {
  const defaultPromo: Team = {
    id: 0,
    name: "",
    readiness: false,


  };
  const [Team, setTeam] = useState<Team>({
    ...defaultPromo,
    ...overrides,
  });
  return { Team, setTeam };
};

export interface Student {
  id: number,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  promotion: string,
  currentYear: string,
  isLeader: boolean
  team: string,
}
export interface sTudent {
  stuDent: Student,

}
export interface StudentState {
  student: Student;
  setStudent: React.Dispatch<React.SetStateAction<Student>>;
}
export const useStudent = (overrides?: Partial<Student>): StudentState => {
  const defaultStudent: Student = {
    id: 0,
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    placeOfBirth: "",
    email: "",
    userName: "",
    password: "",
    promotion: "",
    currentYear: '',
    isLeader: false,
    team: "",

  };
  const [student, setStudent] = useState<Student>({
    ...defaultStudent,
    ...overrides,
  });
  return { student, setStudent };
};
export interface Invite {
  id:number,
  sender:number;
  receiver:number;
  accepted:boolean;
  rejected:boolean;
}
export interface inviteState{
  invite:Invite,
  setInvite:React.Dispatch<React.SetStateAction<Invite>>;
}
export  const useInvite = (overrides?: Partial<Invite>): inviteState => {
  const defaultInvite: Invite= {
   id:0,
   sender:0,
   receiver:0,
   accepted:false,
   rejected:false


  };
  const [invite, setInvite] = useState<Invite>({
...defaultInvite,
...overrides,

}); 
return {invite,setInvite};
}