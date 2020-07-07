import { Component, OnInit } from '@angular/core';
import { Question, Adventure, Option } from 'src/app/models/model';
import { DataloaderService, GameService } from 'src/app/services/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  adventure: Adventure;
  isLoading: boolean;
  currentQuestion: Question;

  constructor(public dataLoaderService: DataloaderService,
              public route: ActivatedRoute,
              public router: Router,
              public gameService: GameService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadAdventure();
  }

  loadAdventure(): void {
    const adventureName = this.route.snapshot.paramMap.get('id');
    this.adventure = this.dataLoaderService.getAdventure(adventureName);
    if (!this.adventure) {
      // something went wrong.
      // ideally we should inform the user(maybe using a toast), but for the sake of simplicity I am redirecting to dashboard.
      this.router.navigate(['/dashboard']);
    }

    this.dataLoaderService.loadAdventure(adventureName).subscribe(questions => {
      this.gameService.loadAdventure(this.adventure.name, questions);
      this.gameService.startAdventure();
      this.beginGame();
    });

    this.gameService.currentQuestion.subscribe(question => this.currentQuestion = question);
  }

  onExit(): void {
    this.gameService.endGame();
    this.router.navigate(['/dashboard']);
  }

  onStartOver(): void {
    // This can be used to persist the data to server. Leaving it for the sake of simiplicity.
    this.gameService.endGame();
    this.router.navigate(['/dashboard']);
  }

  // This function is to mimic the delay in loading.
  beginGame(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

}
