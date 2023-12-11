import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() public data?: any;
  @Input() public title = '';
  @Input() public templateRef!: TemplateRef<any>;
  @Output() public close = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  public closeModal() {
    this.elementRef.nativeElement.remove();
    this.close.emit();
  }
}
