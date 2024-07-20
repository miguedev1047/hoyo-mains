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

export const InputWrapperDarkest:
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
  'bg-color-dark data-[hover=true]:bg-color-dark-hover group-data-[focus=true]:bg-color-darkest-hover'
}

export const selectInputWrapperDarkest:
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
  value: 'flex flex-wrap py-2 gap-2',
  listbox:
    'data-[hover=true]:bg-red-500 data-[hover=true]:text-default-foreground'
}

export const selectWrapperDark:
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

export const selectItemDarkest:
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
    'min-h-12 py-2 flex bg-color-darkest data-[hover=true]:bg-color-darkest-hover group-data-[focus=true]:bg-color-darkest-hover',
  value: 'flex flex-wrap py-2 gap-2',
  popoverContent: 'bg-color-darkest'
}

export const selectItemDark:
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
  'dark:bg-primary-color bg-primary-color rounded-lg'
