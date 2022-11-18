export type TypeButton = {
  nameButton: string
  className: string
  onClick(e: React.FormEvent<HTMLElement>): void
}
