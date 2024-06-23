import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type DialogComponentProps = PropsWithChildren<{
  open: boolean
  onRequestClose: () => void
  className?: string | undefined
}>

const DialogComponent: FC<DialogComponentProps> = ({ children, open, onRequestClose, className }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (dialogRef.current === null) {
      return
    }
    if (open) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [open])

  if (!open) {
    return null
  }
  return createPortal(
    <dialog
      ref={dialogRef}
      className={className}
      onCancel={onRequestClose}
      onClick={(e) => {
        // Close the dialog when the backdrop is clicked
        if (e.target === dialogRef.current) {
          onRequestClose()
        }
      }}
    >
      {children}
    </dialog>,
    // If open <dialog> element is moved, the style is broken.
    // To avoid it, put <dialog> to the top level.
    document.body,
  )
}

export default DialogComponent
