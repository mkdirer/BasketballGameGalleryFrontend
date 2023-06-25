import { Team } from './../../models/team.model';
import { TeamService } from './../../service/modules_service/team.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

    team: Team = {
      name: '',
      country: '',
      league: ''
    };
    submitted = false;
    constructor(private teamService: TeamService) { }
    ngOnInit(): void {
    }
    saveTeam(): void {
      const data = {
        name: this.team.name,
        country: this.team.country,
        league: this.team.league
      };
      this.teamService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e)
        });
    }
    newTeam(): void {
      this.submitted = false;
      this.team = {
        name: '',
        country: '',
        league: ''
      };
    }

  }
