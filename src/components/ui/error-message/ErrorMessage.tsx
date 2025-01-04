
export const ErrorMessage = ({children}: {children: React.ReactNode}) => {
  return (
    <small className="font-semibold text-red-500 text-sm text-right">
      {children}
    </small>
  )
}
