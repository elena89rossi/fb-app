import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fb-console-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() imageSrc!: string;
  /**
   * @Input() lunghezza immagine logo
   *
   * @Default 'auto'
   */
  @Input() imageWidth = 'auto';
  /**
   * @Input() lunghezza immagine logo
   *
   * @Default '38px'
   */
  @Input()imageHeight = '38px';
  /**
   * @Input() alt message logo
   *
   * @Default '38px'
   */
  @Input() imageAltMessage!: string;
   /**
    * @Output prop
    *
    * EventEmitter per la gestione del click sul bottone
    */
  @Output() imageActionClickEvt: EventEmitter<void> = new EventEmitter<void>();

    /**
    * Metodo per la gestione dell'emissione dell'evento di click sul logo
    */

  public handleClickEvt(): void {
    this.imageActionClickEvt.emit();
  }
}
