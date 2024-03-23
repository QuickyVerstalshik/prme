import Home from "./page"

export default function Page() {
  return (
      <Home></Home>
  )
}
Page.getLayout = function getLayout(page: any) {
  return (
      <>
    {page}
    </>
  )
}
