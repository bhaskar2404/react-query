import { useQuery } from 'react-query';
import axios from 'axios';
import React from 'react';
import { Container, Flex, Grid, Heading, Stack,Spinner, Text, useToast} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../api';



const Post = () => {

    const {id}=useParams();
    
    const {data,isLoading}=useQuery(["post",id],()=>fetchPost(id),{
       
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
        
     
      <Stack p="4" boxShadow="md" borderRadius="x1" border="1px solid #ccc" key={data.data.id}  mb="4">
          <Flex  justify="space-between">
              <Text>user id: {data.data.user_id}</Text>
              <Text>Title: {data.data.title}</Text>
          </Flex>
          <Heading fontSize="2xl">{data.data.tile}</Heading>
          <Text>{data.data.body}</Text>
      </Stack>
      </>)}
    
                
     
  </Container>);
};

export default Post;
