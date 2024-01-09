import { redirect } from 'next/navigation'
 

export default async function Fallback({params}:{ params: { route: string } }) {

    redirect(`/${params.route}`)

 
  // ...
}