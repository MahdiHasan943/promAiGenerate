import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'


export const metadate = {
    title: "Promptopia",
    description:'Discover & Share AI Prompts'
}
const RootLayout  = ({children}) => {
  return (
    <html lang="en">
    <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
          <body>
        <Provider>
        <div className='main'>
                  <div className='gradient' />
              </div>
              
        <main className='app'>
          <Nav />
          
                  {children}

              </main>
         </Provider>
        
    </body>
    </html>
  )
}

export default RootLayout 