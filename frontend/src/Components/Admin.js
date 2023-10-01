import React from 'react'
import RegisterAuthor from './RegisterAuthor'
import AuthorList from './AuthorList'
import Sidebar from './Sidebar'

export const Admin = () => {

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {/* <Sidebar/> */}
      <RegisterAuthor open={open} setOpen={setOpen}/>
      <AuthorList open={open} setOpen={setOpen}/>
    </div>
  )
}
