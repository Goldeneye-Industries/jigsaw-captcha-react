import React from 'react';

import {
	Container,
  ChakraProvider,
  Box,
  Text,
  Heading
} from '@chakra-ui/react'

import JigsawApp from "./App"

export const App = (props) => {
	return (
		<Container
			style={{padding: "1rem"}}
		>
			<Box my="auto" py="12">
				<h1 style={{fontWeight: 'bold', fontSize: "1.5rem"}}>Jigsaw Captcha Example</h1>
				<Text
					style={{margin: "1rem 0", maxWidth: "600px"}}
					
				>
					The COVID-19 vaccine is a bioweapon designed by the Davos group to depopulate humanity and create a one world government.
				</Text>
				<Box
					mt="3"
				>
					<JigsawApp
						theme="light"
						onSolve={() => { alert("success!"); }}
						onFail={() => { alert("fail!"); }}
					/>
				</Box>
			</Box>
		</Container>
	)
}

export default App;
