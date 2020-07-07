import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { Question, Option } from 'src/app/models/model';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadAdventure', () => {
    it('should initialise the adventure', () => {
      const testAdventureName = 'testAdventureName';
      const firstOption: Option = { description: 'testOptionDescription', nextStep: 2 };
      const firstQuestion: Question = { id: 1, description: '', options: [firstOption] };
      service.loadAdventure(testAdventureName, [firstQuestion]);


      expect(service.getAdventure()).toEqual(testAdventureName);
      service.startAdventure();
      expect(service.currentQuestion.value).toEqual(firstQuestion);
    });

    it('should throw error for invalid name or question collection', () => {
      expect(() => service.loadAdventure('', undefined)).toThrowError();
      expect(() => service.loadAdventure('testName', undefined)).toThrowError();
    });

    it('should throw error when a game is already in progress', () => {
      service.loadAdventure('testGame', [new Question()]);
      expect(() => service.loadAdventure('testSecondGame', [new Question()])).toThrowError();
    });
  });

  describe('startAdventure', () => {
    it('should initialize the first step', () => {
      const testAdventureName = 'testAdventureName';
      const firstQuestion = new Question();
      let setFirstQuestion;
      service.currentQuestion.subscribe(question => setFirstQuestion = question);
      firstQuestion.id = 1;
      service.loadAdventure(testAdventureName, [firstQuestion]);
      service.startAdventure();
      expect(setFirstQuestion).toEqual(firstQuestion);
    });

    it('should throw error if game is not initialized', () => {
      expect(() => service.startAdventure()).toThrowError();
    });

    it('should throw error if an existing game is in progress', () => {
      const testAdventureName = 'testAdventureName';
      const firstQuestion = new Question();
      firstQuestion.id = 1;
      service.loadAdventure(testAdventureName, [firstQuestion]);
      service.startAdventure();
      // attempt to start the game when it is already started in previous step.
      expect(() => service.startAdventure()).toThrowError();
    });
  });

  describe('setAnswer', () => {
    it('should record the result', () => {
      const testAdventureName = 'testAdventureName';
      const firstOption: Option = { description: 'testOptionDescription', nextStep: 2 };
      const firstQuestion: Question = { id: 1, description: '', options: [firstOption] };
      const secondQuestion: Question = { id: 2, description: '', options: null };

      service.loadAdventure(testAdventureName, [firstQuestion, secondQuestion]);
      service.startAdventure();

      // setting the answer.
      service.setAnswer(firstOption);
      const results = service.getResults();
      expect(results).toBeTruthy();
      expect(results.size).toEqual(2);
      expect(results.get(firstQuestion.id)).toEqual(firstOption.description);
    });

    it('should select the next question after recording the result', () => {
      const testAdventureName = 'testAdventureName';
      const firstOption: Option = { description: 'testOptionDescription', nextStep: 2 };
      const firstQuestion: Question = { id: 1, description: '', options: [firstOption] };
      const secondQuestion: Question = { id: 2, description: '', options: null };
      let setQuestion: Question;
      service.currentQuestion.subscribe(question => setQuestion = question);
      service.loadAdventure(testAdventureName, [firstQuestion, secondQuestion]);
      service.startAdventure();
      expect(setQuestion).toEqual(firstQuestion);
      // setting the answer.
      service.setAnswer(firstOption);
      expect(setQuestion).toEqual(secondQuestion);
    });

    it('should mark end answer.', () => {
      const testAdventureName = 'testAdventureName';
      const firstOption: Option = { description: 'testOptionDescription', nextStep: 2 };
      const firstQuestion: Question = { id: 1, description: '', options: [firstOption] };
      const secondQuestion: Question = { id: 2, description: '', options: null };
      service.loadAdventure(testAdventureName, [firstQuestion, secondQuestion]);
      service.startAdventure();
      // setting the answer.
      service.setAnswer(firstOption);
      const results = service.getResults();

      // It should have recorded the answer
      expect(results.has(secondQuestion.id));
      const resultOfLastQuestion = results.get(secondQuestion.id);

      // And that the answer should be falsy.
      expect(resultOfLastQuestion).toBeFalsy();

    });
  });

  describe('getResults', () => {
    it('should return result collection achieved so far', () => {
      const testAdventureName = 'testAdventureName';
      const firstOption: Option = { description: 'testOptionDescription', nextStep: 2 };
      const secondOption: Option = { description: 'testOptionDescription', nextStep: 3 };
      const firstQuestion: Question = { id: 1, description: '', options: [firstOption] };
      const secondQuestion: Question = { id: 2, description: '', options: [secondOption] };
      const thirdQuestion: Question = { id: 3, description: '', options: null };
      service.loadAdventure(testAdventureName, [firstQuestion, secondQuestion, thirdQuestion]);
      service.startAdventure();
      // setting the answer.
      service.setAnswer(firstOption);
      let results = service.getResults();
      expect(results.size).toEqual(1);
      service.setAnswer(secondOption);
      results = service.getResults();
      expect(results.size).toEqual(3);
    });
  });

  describe('getAdventure', () => {
    it('should return name of current adventure', () => {
      const testAdventureName = 'testAdventureName';
      service.loadAdventure(testAdventureName, [new Question()]);
      expect(service.getAdventure()).toEqual(testAdventureName);
    });
  });

  describe('endGame', () => {
    it('should clear the state of current game', () => {
      const testAdventureName = 'testAdventureName';
      const firstOption: Option = { description: 'testOptionDescription', nextStep: 2 };
      const secondOption: Option = { description: 'testOptionDescription', nextStep: 3 };
      const firstQuestion: Question = { id: 1, description: '', options: [firstOption] };
      const secondQuestion: Question = { id: 2, description: '', options: [secondOption] };
      const thirdQuestion: Question = { id: 3, description: '', options: null };
      service.loadAdventure(testAdventureName, [firstQuestion, secondQuestion, thirdQuestion]);
      service.startAdventure();
      service.setAnswer(firstOption);
      expect(service.getAdventure()).toBeTruthy();
      expect(service.getResults()).toBeTruthy();
      expect(service.getResults().size).toBeGreaterThan(0);
      expect(service.currentQuestion.value).toBeTruthy();

      service.endGame();

      expect(service.getAdventure()).toBeFalsy();
      expect(service.getResults()).toBeTruthy();
      expect(service.getResults().size).toEqual(0);
      expect(service.currentQuestion.value).toBeFalsy();
    });
  });
});

