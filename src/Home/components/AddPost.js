import { Heading, Stack, useToast} from '@chakra-ui/react';

import { Form, Formik } from 'formik';
import { InputControl, SubmitButton, TextareaControl } from 'formik-chakra-ui';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addNewPost } from '../../api';


const AddPost = () => {
    const cache=useQueryClient();
    const toast=useToast();
    const {isLoading,data,mutateAsync}=useMutation("addPost",
    addNewPost,
    {   onSuccess:()=>{
            console.log("Onsuccess");
            cache.invalidateQueries('posts')
    },
        onError:(error)=>{
            console.log(error);
            toast({status:"error",title:error.message})

        },
    });
    console.log(data);
  return <div>
        <Formik initialValues={{title:"",body:""}}
        onSubmit={async (values)=>{
            await mutateAsync({title:values.title,body:values.body})
        }}>
            <Form>
                <Stack my="4">
                    <Heading fontSize="2x1" textAlign="center"> Add New Post</Heading>
                <InputControl name="title" label="Title"/>
                <TextareaControl name="body" label="Content"/>
                <SubmitButton>Add Post</SubmitButton>
                </Stack>
            </Form>
        </Formik>
  </div>;
};

export default AddPost;
