import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public currentResponse:any = "";
  public textareaValue:any = "sdsd";

  constructor(public backend:BackendService) { }

  ngOnInit(): void {
    this.backend.messages.subscribe((data)=>{
      if(data && data.action == "onPlayerSendResponse"){
        this.textareaValue += "\n";
        this.textareaValue += data.player.name + " : "+data.msg;
      }
    })
  }

  sendMessage(){
      this.backend.messages.next({
        "router":"PlayerRouter",
        "method":"sendResponse",
        "args":{
          "msg":this.currentResponse
        }
      })
      this.currentResponse = "";
  }

}
