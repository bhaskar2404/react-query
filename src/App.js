import logo from './logo.svg';
import './App.css';
import  {QueryClient,QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import { ChakraProvider, Heading } from '@chakra-ui/react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Home/Home';
import Post from './Post/Post';

const queryClient=new QueryClient();
function App() {
  return (
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/:id' element={<Home/>}/>
          <Route path='/post/:id' element={<Post/>}/>

        </Routes>
      </BrowserRouter>
    <Heading> React query
         </Heading>
         <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
