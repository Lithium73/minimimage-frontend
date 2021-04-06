import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {BackendService} from '../backend.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  public roomId:any;
  public myName:string = "";

  public error:any=null;

  public wordPerPerson:any=3;
  public timePerPerson:any=60;

  constructor(public backend:BackendService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.handleParams(params)
    });

    this.backend.messages.subscribe((data)=>{

      if(data && data.action == "onError"){
        console.error("find error",data)
        this.error = data.description;
      }
      if(data && data.action == "onMatchBegin"){
        this.backend.wordPerPerson = parseInt(data.match.wordPerPerson)
        this.router.navigate(['words',this.roomId])
      }

      if(data && data.action == "onPlayerInfo"){
        this.backend.currentAccount = data.player.id
      }
    })
  }



  handleParams(params){
    this.roomId = params['roomId'];
    
    setTimeout(()=>{ //Timeout needed to handle websocket connection
      this.backend.messages.next({
        "router" : "PlayerRouter",
        "method" : "addPlayer",
        "args" : {"name":"unknown player","roomId":this.roomId,"isHost":this.backend.isHost}
      })
    },1000)
  }

  changeName(){
    this.backend.messages.next({
      "router" : "PlayerRouter",
      "method" : "changeName",
      "args" : {"name":this.myName}
    })
  }

  startGame(){
    if(!this.backend.isHost){
      this.backend.messages.next({
        "router" : "PlayerRouter",
        "method" : "setReady",
        "args" : {"ready":true}
      })
    }else{
      this.backend.messages.next({
        "router" : "MatchRouter",
        "method" : "startGame",
        "args" : {wordPerPerson:this.wordPerPerson,timePerPerson:this.timePerPerson}
      })
    }
  }

}
