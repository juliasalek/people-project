import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { ModalComponent } from '../components/modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  private _modalNotifier?: Subject<string>;
  constructor(
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  public open(
    content: TemplateRef<any>,
    options: { data: any; title: string }
  ) {
    const modalComponentFactory =
      this._resolver.resolveComponentFactory(ModalComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this._injector, [
      contentViewRef.rootNodes,
    ]);
    modalComponent.instance.data = options.data;
    modalComponent.instance.title = options.title;
    modalComponent.instance.templateRef = content;
    modalComponent.instance.close.subscribe(() => this.closeModal());
    modalComponent.hostView.detectChanges();
    this._document.body.appendChild(modalComponent.location.nativeElement);
    this._modalNotifier = new Subject();
    return this._modalNotifier.asObservable();
  }

  private closeModal() {
    this._modalNotifier?.complete();
  }
}
