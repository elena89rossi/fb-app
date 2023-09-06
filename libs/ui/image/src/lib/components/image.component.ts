import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fb-console-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() imageSrc!: string;
  /**
   * @Input() image width
   *
   * @Default 'auto'
   */
  @Input() imageWidth = 'auto';
  /**
   * @Input() image height
   *
   * @Default '38px'
   */
  @Input()imageHeight = '38px';
  /**
   * @Input() alt message 
   *
   * @Default '38px'
   */
  @Input() imageAltMessage!: string;
   /**
    * @Output prop
    *
    * EventEmitter that handle click event
    */
  @Output() imageActionClickEvt: EventEmitter<void> = new EventEmitter<void>();
  
  /**
   * A function that handles the click event.
   *
   * @return {void} This function does not return anything.
   */
  public handleClickEvt(): void {
    this.imageActionClickEvt.emit();
  }
}
