import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import {WordsComponent} from './words/words.component';
import {RoundComponent} from './round/round.component';
import {EndComponent} from './end/end.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lobby/:roomId', component: LobbyComponent },
  { path: 'words/:roomId', component: WordsComponent },
  { path: 'round/:roomId', component: RoundComponent },
  { path: 'end', component: EndComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
