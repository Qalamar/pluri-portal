import { observable } from "mobx";

class Variables {
  @observable searchList = "";
}
export const store = new Variables();
