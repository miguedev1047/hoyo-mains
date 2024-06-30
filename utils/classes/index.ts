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
  listbox:
    'data-[hover=true]:bg-red-500 data-[hover=true]:text-default-foreground'
}

export const selectorItemWrapper:
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
    'min-h-12 py-2 flex bg-color-darkest data-[hover=true]:bg-color-dark-hover group-data-[focus=true]:bg-color-dark-hover',
  value: 'flex flex-wrap py-2 gap-2',
  popoverContent: 'bg-color-darkest',
  listbox:
    'data-[hover=true]:bg-red-500 data-[hover=true]:text-default-foreground'
}

export const selectorItemDarkwrapper:
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
    'min-h-12 py-2 flex bg-color-dark data-[hover=true]:bg-color-dark-hover group-data-[focus=true]:bg-color-dark-hover',
  value: 'flex flex-wrap py-2 gap-2',
  popoverContent: 'bg-color-dark'
}

export const skeletonWrapper =
  'dark:bg-pri before:bg-gradient-to-r dark:before:from-color-dark/10 dark:before:via-color-dark dark:before:to-color-dark/10 before:border-0'
