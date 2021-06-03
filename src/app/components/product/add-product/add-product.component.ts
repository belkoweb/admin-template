import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DiseaseFacade } from 'src/app/facades/disease.facade';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  private contenu: string;
  public form = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    nomScientifique: new FormControl(null, [Validators.required]),
    langue: new FormControl(null, []),
  });
  public Editor = ClassicEditor;
  constructor(private diseaseFacade: DiseaseFacade, private router: Router) {}

  ngOnInit() {}
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.contenu = data;
  }
  get nom() {
    return this.form.get('nom');
  }
  get nomScientifique() {
    return this.form.get('nomScientifique');
  }
  submit() {
    this.diseaseFacade.save({
      nom: this.nom.value,
      contenu: this.contenu,
      nomScientifique: this.nomScientifique.value,
    });
  }
}
