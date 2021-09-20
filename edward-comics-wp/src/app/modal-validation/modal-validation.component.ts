import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IComics } from 'src/models/comic.model';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal-validation',
  templateUrl: './modal-validation.component.html',
  styleUrls: ['./modal-validation.component.css']
})
export class ModalValidationComponent implements OnInit {
  comicSubscription!: Subscription;
  activeSubscription!: Subscription;
  comic!: IComics;
  active!: boolean;

  constructor(private modalService: ModalService) {
    this.active = this.modalService.active
  }

  ngOnInit(): void {
    this.comicSubscription = this.modalService.comicSubject.subscribe(
      (comic: IComics) => {
        this.comic = comic;
      }
    );
    this.activeSubscription = this.modalService.activeSubject.subscribe(
      (active: boolean) => {
        this.active = active;
      }
    );
    this.modalService.emitComic();
  }

  disableModal() {
    this.active = this.modalService.hideModal();
  }

  activeModal() {
    this.active = this.modalService.showModal();
  }
}
