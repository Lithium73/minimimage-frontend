import { Component, OnInit,Input } from '@angular/core';
import {BackendService} from '../backend.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public currentResponse:any = "";
  public textareaValue:any = "sdsd";

  @Input("canChat")canChat:any=false;


  constructor(public backend:BackendService) { }

  ngOnInit(): void {
    // if(this.canChat=="false")this.canChat=false;
    // if(this.canChat=="true")this.canChat=true;
    this.backend.messages.subscribe((data)=>{
      if(data && data.action == "onPlayerSendResponse"){
        this.textareaValue += "\n";
        this.textareaValue += data.player.name + " : "+data.msg;
      }

      // if(data && data.action == "onRound"){
      //   this.canChat = !(data.round.currentMaster.id == this.backend.currentAccount)
      // }
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
