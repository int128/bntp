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
  return createPortal(
    <dialog
      ref={dialogRef}
      className={className}
      onCancel={onRequestClose}
      onClick={(e) => {
        if (dialogRef.current === null) {
          return
        }
        if (!isClickedInRect(e, dialogRef.current.getBoundingClientRect())) {
          onRequestClose()
        }
      }}
    >
      {children}
    </dialog>,
    // When an element of <dialog> is moved, the style is broken.
    document.body,
  )
}

export default DialogComponent

const isClickedInRect = (e: React.MouseEvent, r: DOMRect): boolean =>
  e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom
