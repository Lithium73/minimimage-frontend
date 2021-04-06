import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {

  constructor(public backend:BackendService) { }

  public players:any = [];
  public firstLoad:boolean = false;

  ngOnInit(): void {
    this.backend.messages.subscribe((data)=>{
      if(data && data.action == "onPlayerEntered"){
        if(!this.firstLoad && !this.backend.isHost){
          this.firstLoad = true;
          for(let team of data.room.teams){
            for(let player of team.players){
              this.players.push(player)
            }
          }
        }else{
          this.players.push(data.player)
        }
      }
      if(data && data.action == "onPlayerChangeName"){
        for(let player of this.players){
          if(player.id == data.player.id){
            player.name = data.player.name;
          }
        }
      }
      if(data && data.action == "onPlayerExited"){

        this.players = this.players.filter((p)=>{
          return p.id != data.player.id
        })
      }
      if(data && data.action == "onPlayerReady"){
        
        for(let player of this.players){
          if(player.id == data.player.id){
            player.ready = data.player.ready
          }
        }
      }
    })
  }

}
