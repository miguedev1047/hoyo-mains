interface SheetAnimationsProps {
  side: 'left' | 'right' | 'top' | 'bottom'
}
export const SheetAnimations = ({ side }: SheetAnimationsProps) => {
  switch (side) {
    case 'right':
      return {
        variants: {
          enter: {
            x: 0,
            transition: {
              duration: 0.3
            }
          },
          exit: {
            x: 600,
            transition: {
              duration: 0.3
            }
          }
        }
      }
    case 'left':
      return {
        variants: {
          enter: {
            x: 0,
            transition: {
              duration: 0.3
            }
          },
          exit: {
            x: -600,
            transition: {
              duration: 0.3
            }
          }
        }
      }

    case 'top':
      return {
        variants: {
          enter: {
            y: 0,
            transition: {
              duration: 0.3
            }
          },
          exit: {
            y: -600,
            transition: {
              duration: 0.3
            }
          }
        }
      }

    case 'bottom':
      return {
        variants: {
          enter: {
            y: 0,
            transition: {
              duration: 0.3
            }
          },
          exit: {
            y: 600,
            transition: {
              duration: 0.3
            }
          }
        }
      }

    default:
      return {
        variants: {
          enter: {
            x: 0,
            transition: {
              duration: 0.3
            }
          },
          exit: {
            x: 600,
            transition: {
              duration: 0.3
            }
          }
        }
      }
  }
}
