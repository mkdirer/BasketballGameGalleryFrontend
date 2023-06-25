import { AdminPanelComponent } from './panels/admin-panel/admin-panel.component';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { MatchProfileComponent } from './components/match-profile/match-profile.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { PlayerProfileComponent } from './components/player-profile/player-profile.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { TeamProfileComponent } from './components/team-profile/team-profile.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { ModeratorPanelComponent } from './panels/moderator-panel/moderator-panel.component';
import { UserPanelComponent } from './panels/user-panel/user-panel.component';
import { ProfileComponent } from './main_components/profile/profile.component';
import { RegisterComponent } from './main_components/register/register.component';
import { LoginComponent } from './main_components/login/login.component';
import { HomeComponent } from './main_components/home/home.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: UserPanelComponent },
  { path: 'mod', component: ModeratorPanelComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/:id', component: TeamProfileComponent },
  { path: 'addteam', component: CreateTeamComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'players/:id', component: PlayerProfileComponent },
  { path: 'addplayer', component: CreatePlayerComponent },
  { path: 'matches', component: MatchListComponent },
  { path: 'matches/:id', component: MatchProfileComponent },
  { path: 'addmatch', component: CreateMatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
