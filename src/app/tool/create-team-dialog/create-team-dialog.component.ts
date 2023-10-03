import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup , FormControlName} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.scss']
})
export class CreateTeamDialogComponent {

  form! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){}

  ngOnInit() {
      this.form = this.formBuilder.group({
        name: [,[]],
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
