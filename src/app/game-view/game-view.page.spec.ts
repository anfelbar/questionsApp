import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameViewPage } from './game-view.page';

describe('GameViewPage', () => {
  let component: GameViewPage;
  let fixture: ComponentFixture<GameViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
