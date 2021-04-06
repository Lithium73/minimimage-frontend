import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "./websocket.service";

const CHAT_URL = "ws://127.0.0.1:8080";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class BackendService {
  public messages: Subject<any>;
  public isHost :boolean = false;
  public wordPerPerson:number = 3;

  public currentRound:any = null;

  public currentAccount:any=null;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect(CHAT_URL).map(
      (response: MessageEvent): any => {
        return JSON.parse(response.data);
      }
    )
  }
}
