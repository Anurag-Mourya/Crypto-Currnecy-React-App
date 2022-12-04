import { Alert, AlertIcon, VStack } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <VStack>
   <Alert status='error' position={'fixed'} bottom={'4'} left={'50%'} transform={'translateX(-50%)'} maxW={'container.lg'}>
    <AlertIcon/>
    {message}

   </Alert>
   </VStack>
  )
}

export default ErrorComponent