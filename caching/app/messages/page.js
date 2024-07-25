import Messages from '@/components/messages';
import { unstable_noStore } from 'next/cache';

//export const revalidate = 5;
//export const dynamic = 'force-dynamic'; // cache: 'no-store'

//export const dynamic = 'force-static';


export default async function MessagesPage() {
  unstable_noStore();
  /*const response = await fetch('http://localhost:8080/messages'/* , {
    //cache: 'no-store'
    next: {
      revalidate: 2,
    } 
  } );*/
  const response = await fetch('http://localhost:8080/messages', {
    next: {
      tags: ['msg']
    }
  })
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
