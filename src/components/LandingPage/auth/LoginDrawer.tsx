'use client'

import Drawer from '@/components/ui/Drawer/Drawer'
import LoginForm from '@/components/auth/LoginForm/LoginForm'

type Props = {
  open: boolean
  onClose: () => void
}

export default function LoginDrawer({ open, onClose }: Props) {
  return (
    <Drawer
      isOpen={open}
      onClose={onClose}
      title="로그인"
      size="md"
      className="z-[90]"
      overlayClassName="bg-black/40"
      panelClassName="max-w-md bg-neutral-50 shadow-xl border-l-0"
      headerClassName="flex items-center justify-between px-5 py-4 border-b bg-neutral-50"
      titleClassName="text-lg font-semibold"
      closeButtonClassName="rounded-md px-3 py-2 text-sm hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary"
      contentClassName="px-6 py-8 bg-neutral-50"
    >
      <LoginForm />
    </Drawer>
  )
}
