import { SlotsToClasses } from '@nextui-org/theme'

export const InputWrapper:
  | SlotsToClasses<
      | 'description'
      | 'errorMessage'
      | 'label'
      | 'base'
      | 'mainWrapper'
      | 'innerWrapper'
      | 'helperWrapper'
      | 'input'
      | 'inputWrapper'
      | 'clearButton'
    >
  | undefined = {
  inputWrapper:
    'bg-color-darkest data-[hover=true]:bg-color-dark-hover group-data-[focus=true]:bg-color-dark-hover'
}

export const selectInputWrapper:
  | SlotsToClasses<
      | 'description'
      | 'errorMessage'
      | 'label'
      | 'base'
      | 'value'
      | 'mainWrapper'
      | 'trigger'
      | 'innerWrapper'
      | 'selectorIcon'
      | 'spinner'
      | 'listboxWrapper'
      | 'listbox'
      | 'popoverContent'
      | 'helperWrapper'
    >
  | undefined = {
    trigger:
    'bg-color-darkest data-[hover=true]:bg-color-dark-hover group-data-[focus=true]:bg-color-dark-hover',
    popoverContent: 'bg-color-darkest',
    listbox: 'data-[hover=true]:bg-red-500 data-[hover=true]:text-default-foreground'

}