export interface ButtonProps {
  name: string
  className?: string
  onClick(e: React.FormEvent<HTMLElement>): void
}
