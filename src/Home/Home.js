import { useQuery } from 'react-query';
import axios from 'axios';
import React from 'react';
import { Container, Flex, Grid, Heading, Stack,Spinner, Text, useToast, Button } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddPost from './components/AddPost';
import { fetchPosts } from '../api';



const Home = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const pageid=parseInt(id);
    const {data,isLoading}=useQuery(["posts",pageid],()=>fetchPosts(pageid),{
        keepPreviousData:true,
        onError:(error)=>{
        toast({status:"error",title:error.message})
    }});
    const toast=useToast()
   
   
  return (<Container maxW="1300px">

{isLoading ? (
        <Grid placeItems="center" height="100vh">
          <Spinner />
        </Grid>
      ) :(<>
            <AddPost/>
        <Flex justify="space-between" mb="4">
            <Button colorSchema="red" onClick={()=>{
                if (data.meta.pagination.links.previous !== null) {
                    navigate(`/${pageid - 1}`);
                  }
                }}
                disabled={data.meta.pagination.links.previous === null}
               >Previous</Button>
               <Text>Current page:{pageid}</Text>
            <Button colorSchema="green" onClick={()=>navigate(`/${pageid+1}`)}>Next</Button>
        </Flex>
      {data?.data.map((post)=>( 
          <Link key={post.id} to={`/post/${post.id}`}>
      <Stack p="4" boxShadow="md" borderRadius="x1" border="1px solid #ccc"   mb="4">
          <Flex  justify="space-between">
              <Text>user id: {post.user_id}</Text>
              <Text>Post id: {post.id}</Text>
          </Flex>
          <Heading fontSize="2xl">{post.tile}</Heading>
          <Text>{post.body}</Text>
      </Stack>
      </Link>))}
      </>)}
    
                
     
  </Container>);
};

export default Home;
