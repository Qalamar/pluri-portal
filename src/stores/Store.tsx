import { observable } from "mobx";
import { useState } from "react";



class Variables {
  @observable searchList = "";
  @observable Notifications = [{
    Desciption: 'Team invite',
    Icon: 'addCircleOutline'
  }, {
    Desciption: 'Another notification',
    Icon: 'addCircleOutline'
  }];
}
export const store = new Variables();
