import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import {BackendService} from './backend.service';
import {WebsocketService} from './websocket.service';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { LogoComponent } from './logo/logo.component';
import { WordsComponent } from './words/words.component';
import { RoundComponent } from './round/round.component';
import { WbComponent } from './wb/wb.component';
import { ChatComponent } from './chat/chat.component';
import { EndComponent } from './end/end.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyComponent,
    PlayerlistComponent,
    LogoComponent,
    WordsComponent,
    RoundComponent,
    WbComponent,
    ChatComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BackendService,WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
