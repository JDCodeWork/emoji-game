import { ButtonHTMLAttributes, PropsWithChildren, useEffect, useState } from "react"
import { cn } from "../../utils/cn"

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return {
    isMobile
  }
}

interface DisplayProps extends PropsWithChildren { }
const Display = ({ children }: DisplayProps) => {
  return (
    <div className="mx-4 text-center select-none" >
      {children}
    </div>
  )
}

interface TitleProps {
  title: string
}
const Title = ({ title }: TitleProps) => (
  <h1 className="font-black mb-2 uppercase md:mb-8 text-4xl md:font-bold">{title}</h1>
)

interface SubTitleProps {
  label: string
}
const SubTitle = ({ label }: SubTitleProps) => (
  <h2 className="text-lg text-wrap font-bold leading-snug mb-8 md:mb-12 md:text-2xl md:leading-0 uppercase" >{label}</h2>
)

interface ActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}
const Action = ({ label, ...buttonAttributes }: ActionProps) => {
  const { className, ...attributes } = buttonAttributes

  return (
    <button
      className={cn("py-3 px-6 text-lg font-bold uppercase rounded-xl bg-slate-800 hover:bg-slate-700 outline-1 outline-slate-700 disabled:bg-slate-900 disabled:outline-slate-800 disabled:text-slate-400 disabled:cursor-default hover:cursor-pointer", className)}
      {...attributes}
    >
      {label}
    </button >
  )
}

export default {
  Display,
  Title,
  SubTitle,
  Action,
  useMobile
}