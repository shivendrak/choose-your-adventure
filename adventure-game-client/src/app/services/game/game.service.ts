import { Injectable } from '@angular/core';
import { Question, Option } from 'src/app/models/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private result: Map<number, string> = new Map();
  private questionMap: Map<number, Question> = new Map();
  private questions: Question[];
  public currentQuestion = new BehaviorSubject<Question>(undefined);
  private adventure: string;

  public loadAdventure(adventure: string, questions: Question[]): void {
    if (this.adventure) {
      throw new Error('A game is already in progress.');
    }

    if (!adventure) {
      throw new Error('Invalid adventure name');
    }

    if (!questions || questions.length === 0) {
      throw new Error('Invalid questions collection');
    }

    this.adventure = adventure;
    this.result = new Map();
    this.questions = questions;
    questions.forEach(question => this.questionMap.set(question.id, question));
  }

  public startAdventure(): void {
    const firstQuestion = this.questionMap.get(1);
    if (!firstQuestion) {
      throw new Error('Game is not initialized');
    }

    if (this.currentQuestion.value) {
      throw new Error('A game is current in progress.');
    }

    this.currentQuestion.next(firstQuestion);
  }

  public setAnswer(option: Option): void {

    if (!this.currentQuestion.value) {
      throw new Error('Invalid state of game. Check if a game is in progress');
    }
    // TODO: Validate if option belong to current question.
    // Leaving this TODO for simplicity. Validating options can attract an additional map to be stored.
    this.result.set(this.currentQuestion.value.id, option.description);
    const nextQuestion = this.questionMap.get(option.nextStep);
    this.currentQuestion.next(nextQuestion);

    // If we reach to a question which does not have option then it is the end of game.
    // Set the answer of last question as empty.
    if (!nextQuestion.options || nextQuestion.options.length === 0) {
      this.result.set(nextQuestion.id, '');
    }
  }

  public getResults(): Map<number, string> {
    return this.result;
  }

  public getAdventure(): string {
    return this.adventure;
  }

  public getQuestions(): Question[] {
    return this.questions;
  }

  public endGame(): void {
    this.result = new Map();
    this.adventure = '';
    this.questionMap = new Map();
    this.questions = [];
    this.currentQuestion.next(undefined);
  }
}
