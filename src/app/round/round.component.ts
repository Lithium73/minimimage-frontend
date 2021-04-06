import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  constructor(public backend:BackendService,private route: ActivatedRoute,private router:Router) { }



  ngOnInit(): void {

    this.route.params.subscribe(params => {

    });


    this.backend.messages.subscribe((data)=>{
      if(data && data.action == "onRound"){

      }
    });
  }

}
