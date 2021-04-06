import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public roomId:any = "";

  constructor(private backend:BackendService,private router:Router) { }

  ngOnInit(): void {
    this.backend.messages.subscribe(this.gameCreated.bind(this))
  }

  gameCreated(data):void{
    if(data && data.action == "onRoomCreated"){
      this.router.navigate(['lobby',data.room.roomId])
    }
  }

  joinGame(){
    if(this.roomId.length){
      this.router.navigate(['lobby',this.roomId])
    }
  }

  createGame(){
    this.backend.isHost = true;
    this.backend.messages.next({
      "router" : "RoomRouter",
      "method" : "createGame",
      "args" : {}
    })
  }

}
