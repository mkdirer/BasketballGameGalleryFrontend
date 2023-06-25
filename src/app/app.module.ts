import { authInterceptorProviders } from './service/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { TeamProfileComponent } from './components/team-profile/team-profile.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { MatchProfileComponent } from './components/match-profile/match-profile.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { AdminPanelComponent } from './panels/admin-panel/admin-panel.component';
import { ModeratorPanelComponent } from './panels/moderator-panel/moderator-panel.component';
import { UserPanelComponent } from './panels/user-panel/user-panel.component';
import { HomeComponent } from './main_components/home/home.component';
import { LoginComponent } from './main_components/login/login.component';
import { ProfileComponent } from './main_components/profile/profile.component';
import { RegisterComponent } from './main_components/register/register.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreateTeamComponent,
    CreateMatchComponent,
    TeamProfileComponent,
    TeamListComponent,
    MatchProfileComponent,
    MatchListComponent,
    AdminPanelComponent,
    ModeratorPanelComponent,
    UserPanelComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PlayerProfileComponent,
    PlayerListComponent,
    CreatePlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
