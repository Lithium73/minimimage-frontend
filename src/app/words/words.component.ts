import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import {ActivatedRoute,Router} from '@angular/router';

import * as $ from 'jquery';



@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  constructor(public backend:BackendService,private router:Router,private route: ActivatedRoute) { }

  public words:string[] = [];
  public wordsFakeArray:string[] = [];

  private currentRoom:any = null;

  ngOnInit(): void {
    console.log("init WordsComponent")
    this.wordsFakeArray = new Array(this.backend.wordPerPerson)

    this.route.params.subscribe(params => {
      this.currentRoom = params.roomId;
    });

    this.backend.messages.subscribe((data)=>{
      if(data && data.action == "onRound"){
        this.backend.currentRound = data.round
        this.router.navigate(["round",this.currentRoom])
      }
    });

  }

  startGame(){

      this.words = [];
      for(var i = 0;i<this.backend.wordPerPerson; i++ ){
        this.words.push($("#"+i).val());
      }
      
      this.backend.messages.next({
        "router" : "PlayerRouter",
        "method" : "setReady",
        "args" : {"ready":true,"words":this.words}
      })

  }

}
