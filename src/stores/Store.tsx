import { observable } from "mobx";
import { useState } from "react";

class Variables {
  @observable searchList = "";
}
export const store = new Variables();
