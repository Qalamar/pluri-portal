import React, { useState } from "react";

export interface Team {
  id: number;
  name: string;
  readiness: boolean;
  project: number;
  noteAvg: number;
}
export interface TeamInterface {
  TeamIn: Team;
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
    project: 0,
    noteAvg: 0,
  };
  const [Team, setTeam] = useState<Team>({
    ...defaultPromo,
    ...overrides,
  });
  return { Team, setTeam };
};

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  email: string;
  userName: string;
  password: string;
  promotion: number;
  currentYear: string;
  isLeader: boolean;
  note: number;
  team: number;
}
export interface sTudent {
  student: Student;
}
export interface StudentState {
  student: Student;
  setStudent: React.Dispatch<React.SetStateAction<Student>>;
}
export interface NotificationInterface {
  Desciption: string;
  Icon: string;
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
    promotion: 0,
    currentYear: "2019/2020",
    isLeader: false,
    note: 0,
    team: 0,
  };
  const [student, setStudent] = useState<Student>({
    ...defaultStudent,
    ...overrides,
  });
  return { student, setStudent };
};
export interface studentSecure {
  //for users/students
  id: number;
  firstName: string;
  lastName: string;
  promotion: number;
  isLeader: boolean;
  team: number;
}
export interface secureStudent {
  Sstudent: studentSecure;
}
export interface studentState {
  Sstudent: studentSecure;
  setSstudent: React.Dispatch<React.SetStateAction<studentSecure>>;
}
export const useSecureStudent = (
  overrides?: Partial<studentSecure>
): studentState => {
  const defaultStudent: studentSecure = {
    id: 0,
    firstName: "",
    lastName: "",
    promotion: 0,
    isLeader: false,
    team: 0,
  };
  const [Sstudent, setSstudent] = useState<studentSecure>({
    ...defaultStudent,
    ...overrides,
  });
  return { Sstudent, setSstudent };
};

export interface Invite {
  id: number;
  sender: number;
  receiver: number;
  accepted: boolean;
  rejected: boolean;
}
export interface inviteState {
  invite: Invite;
  setInvite: React.Dispatch<React.SetStateAction<Invite>>;
}
export const useInvite = (overrides?: Partial<Invite>): inviteState => {
  const defaultInvite: Invite = {
    id: 0,
    sender: 0,
    receiver: 0,
    accepted: false,
    rejected: false,
  };
  const [invite, setInvite] = useState<Invite>({
    ...defaultInvite,
    ...overrides,
  });
  return { invite, setInvite };
};
export interface project {
  id: number;
  title: string;
  domain: string;
  tools: string;
  requiredDocuments: string;
  document: FormData;
  promo: number;
}
interface projectState {
  Project: project;
  setProject: React.Dispatch<React.SetStateAction<project>>;
}

export const useProject = (overrides?: Partial<project>): projectState => {
  const defaultProject: project = {
    id: -99,
    title: "",
    domain: "",
    tools: "",
    requiredDocuments: "",
    document: new FormData(),
    promo: -99,
  };
  const [Project, setProject] = useState<project>({
    ...defaultProject,
    ...overrides,
  });
  return { Project, setProject };
};
