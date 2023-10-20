import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PlayerListFromATeam, TeamModel } from 'src/app/models/player.model';

@Component({
  selector: 'app-create-mission-dialog',
  templateUrl: './create-mission-dialog.component.html',
  styleUrls: ['./create-mission-dialog.component.scss']
})
export class CreateMissionDialogComponent {
  form! : FormGroup;
  listTeam! : TeamModel[];
  joueurs! : PlayerListFromATeam[];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateMissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerListFromATeam[]
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [,[]],
      shortDescription:[,[]],
      FullDescription:[this.data,[]],
      joueurs:[this.data,[]],
    });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
