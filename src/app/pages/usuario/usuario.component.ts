import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioComponent implements OnInit {

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      ],
    }
  };

  isValidTypeBoolean: boolean = true;

constructor(private ngWizardService: NgWizardService){

}

  ngOnInit(): void {

  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }


  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

}
