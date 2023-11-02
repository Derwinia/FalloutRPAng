import { Component , Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CharacterName } from 'src/app/models/character.model';
import { TeamModel } from 'src/app/models/player.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-create-mission-dialog',
  templateUrl: './create-mission-dialog.component.html',
  styleUrls: ['./create-mission-dialog.component.scss']
})
export class CreateMissionDialogComponent {
  form! : FormGroup;
  listTeam! : TeamModel[];
  joueurs! : CharacterName[];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateMissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CharacterName[]
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [,[]],
      shortDescription:[,[]],
      description:[,[]],
      concernedPlayers:[,[]],
    });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
