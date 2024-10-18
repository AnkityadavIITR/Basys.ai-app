import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

const Modal = ({open,setOpen,type}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} type={type} >
      <DialogContent className="max-w-[323px] bg-[#FCFDFF] pt-0">
        <h1>Loading...</h1>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
