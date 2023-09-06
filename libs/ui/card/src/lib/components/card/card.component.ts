import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ICardButton {
  label: string;
  actionType: string;
}
@Component({
  selector: 'fb-console-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {

  @Input() cardTitle!: string;
  @Input() cardSubtitle!: string;
  @Input() hasButtons: boolean = false;
  @Input() cardButtons: ICardButton[] = [];
  @Input() cardButtonAlignment: 'start' | 'end' = 'end'

  @Output() emitActionButtonEvt: EventEmitter<ICardButton> = new EventEmitter<ICardButton>();

  protected handleActionButton(actionName: ICardButton): void {
    this.emitActionButtonEvt.emit(actionName);
  }
}

