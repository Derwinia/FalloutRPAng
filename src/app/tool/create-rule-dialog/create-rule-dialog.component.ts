import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup , FormControlName} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { RuleModel } from 'src/app/models/rule.model';

@Component({
  selector: 'app-create-rule-dialog',
  templateUrl: './create-rule-dialog.component.html',
  styleUrls: ['./create-rule-dialog.component.scss']
})
export class CreateRuleDialogComponent {

  form! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RuleModel
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [,[]],
      shortDescription:[,[]],
      description:[,[]],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
