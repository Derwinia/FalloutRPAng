import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup , FormControlName } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TeamModel } from 'src/app/models/player.model';


@Component({
  selector: 'app-create-character-dialog',
  templateUrl: './create-character-dialog.component.html',
  styleUrls: ['./create-character-dialog.component.scss']
})
export class CreateCharacterDialogComponent {

  form! : FormGroup;
  listTeam! : TeamModel[];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateCharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamModel[]
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      pseudo: [,[]],
      password:[,[]],
      team:[this.data,[]],
    });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
