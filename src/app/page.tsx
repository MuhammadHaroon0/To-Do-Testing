import React from 'react'
import HomePageClient from './HomePageClient'
import getCurrentUser from './actions/getCurrentUser'
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';

const page = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/auth/sign-in')
  }
  return (
    <HomePageClient currentUser={currentUser} />
  )
}
export default page
