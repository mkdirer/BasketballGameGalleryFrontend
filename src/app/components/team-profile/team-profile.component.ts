import { TeamService } from './../../service/modules_service/team.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})
export class TeamProfileComponent implements OnInit {

  @Input() viewMode = false;
  @Input() currentTeam: Team = {
    name: '',
    country: '',
    league: ''
  };

  message = '';
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTeam(this.route.snapshot.params["id"]);
    }
  }
  getTeam(id: string): void {
    this.teamService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTeam = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateTeam(): void {
    this.message = '';
    this.teamService.update(this.currentTeam.id, this.currentTeam)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : "The team's data has been successfully updated!";
        },
        error: (e) => console.error(e)
      });
  }
  deleteTeam(): void {
    this.teamService.delete(this.currentTeam.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/teams']);
        },
        error: (e) => console.error(e)
      });
  }

}
