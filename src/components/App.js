import {
	useState,
	useEffect
} from "react"

import React from 'react';

import {
	Container,
  Box,
  Image,
  Spinner,
  ChakraProvider,
  useColorModeValue as mode,
  Text,
} from '@chakra-ui/react'

import JiggyIcon from "../img/jiggy.svg"
import GoldeneyeLogo from "../img/goldeneye.svg"

import {
	BiCheckShield
} from "react-icons/bi"

export const App = (props) => {
	
	const { onSolve, onFail, theme, initialText, disableProvider, maxW } = props;

	const JigsawTrack = () => {
		
		const [solved, setSolved] = useState(false);
		const [value, setValue] = useState(0);
		const [mouseDown, setMouseDown] = useState(false)
		const [targetX, setTargetX] = useState(null);
		const [tries, setTries] = useState(0);
		const [text, setText] = useState(initialText || "Slide the puzzle piece to solve the captcha.");
		const maxTries = 5;
		const selectedTheme = theme || "dark"
		
		useEffect(() => {
			initialize();
		}, [])
		
		const initialize = () => {
			let v = 88 + Math.round(Math.random() * 180);
			setValue(28);
			setTargetX(v);
		}
		
		const checkJiggyFits = () => {
			let grace = 10;
			if (value <= (targetX + grace) && value >= (targetX - grace)) {
				solve();
			}
			else {
				fail();
			}
		}
		
		const fail = () => {
			console.log("fail");
			setTries(tries + 1);
			if ((maxTries - tries) <= 0) {
				lock();
			}
			else {
				setText("That didn't work, please try again. ("+(maxTries-tries)+" tries left)");
				initialize();
			}
			if (onFail) { onFail() };
		}
		
		const lock = () => {
			var time = 60;
			setInterval(() => {
				time--;
				if (time < 0) { return }
				setText("You've failed too many times. You can try again in "+time+"s.");
				if (time === 0) {
					initialize();
					setTries(0);
					setText("Solve the puzzle.");
				}
			}, 1000)
			
		}
		
		const solve = () => {
			console.log("correct!");
			setText("Great! You've completed the captcha. You can now continue.");
			setValue(targetX);
			setSolved(true);
			if (onSolve) { onSolve() };
		}
		
		const Jiggy = (props) => {
			
			const { ml } = props;
			
			return (
				<Box
					ml={ml}
					position="relative"
					cursor="pointer"
					zIndex="99"
				>
					<Box
						backgroundImage={'url('+JiggyIcon+')'}
						backgroundSize="contain"
						backgroundRepeat="no-repeat"
						boxSize="1.8rem"
						flexShrink="0"
						filter={mode("brightness(1)", "")}
						zIndex="99"
					/>
					<Box
						boxSize="15px"
						marginTop="-20px"
						marginLeft="6px"
						position="absolute"
						boxShadow="0px 0px 28px 0px rgba(255,204,0,1)"
						boxShadow="0px 0px 28px 0px rgba(155,104,0,1)"
						zIndex="1"
					>
					</Box>
				</Box>	
			)
		}

		const Target = (props) => {
			
			const { x } = props;
			
			return (
				<Box
					backgroundImage={'url('+JiggyIcon+')'}
					backgroundSize="contain"
					backgroundRepeat="no-repeat"
					boxSize="1.8rem"
					flexShrink="0"
					filter={(selectedTheme === "light") ? "grayscale(1) brightness(1.1)" : "grayscale(1) contrast(0.3) brightness(.4)"}
					position="absolute"
					marginLeft={(x-27)+"px"}
				/>
			)
		}
		
		const Info = () => {
			
			const [loading, setLoading] = useState(true);
			const loadTime = 1000;
			
			useEffect(() => {
				setTimeout(() => {
					setLoading(false);
				}, loadTime);
			}, []);
			
			if (solved) {				
				if (loading) {
					return (
						<Box
							w="full"
							fontSize="sm"
							d="flex"
							justifyContent="center"
							my="1"
						>
							<Spinner
								size="xs"
								speed=".5s"
							/>
						</Box>
					)
				}
				
				return (
					<Box
						w="full"
						fontSize="sm"
						d="flex"
						justifyContent="center"
					>
						<BiCheckShield
							fontSize="1.3rem"
						/>
					</Box>
				)
			}
			
			return (
				<Text
					fontSize="sm"
					w="full"
					alignItems="flexStart"
					alignItems="center"
				>
					{text}
				</Text>
			)
		}
			
		const mouseMove = (e) => {
			if (mouseDown) {
				let relX = e.target.parentNode.parentNode.getBoundingClientRect().left - 12;
				let mouseX = e.screenX
				setValue(mouseX - relX);
			}
		}
		
		const touchMove = (e) => {
			if (e.touches.length > 0) {
				let relX = e.target.parentNode.parentNode.getBoundingClientRect().left - 12;
				let mouseX = e.touches[0].clientX;
				console.log(mouseX - relX);
				setValue(mouseX - relX);
			}
		}
		
		const handleTouchEvent = (e) => {
			console.log(e.type);
		 if (e.type === "touchstart") {
				setMouseDown(true);
			}
			else if (e.type === "touchend") {
				setMouseDown(false);
				checkJiggyFits();
			} 
			else {
				
			}
		}
		
		const handleMouseEvent = (e) => {
			console.log(e.type);
		 if (e.type === "mousedown") {
				setMouseDown(true);
			}
			else if (e.type === "mouseout") {
			} 
			else {
				setMouseDown(false);
				checkJiggyFits();
			}
		}
		
		const JiggyRail = () => {
			
			if ((maxTries - tries) < 0) { return null }
			
			return (
				<Box
					d="flex"
					flexDirection="row"
					justifyContent="flex-start"
					rounded="sm"
					w="full"
					pointerEvents="none"
					py="1"
		
				>
					<Jiggy ml={"calc("+value+"px - 1.7rem)"} />
					<Target 
						x={targetX}
					/>
				</Box>
			)
		}
			
		return (
			<>
			<Box
				cursor="pointer"
				onMouseMove={mouseMove}	
				onTouchMove={touchMove}			
				onTouchStart={handleTouchEvent}
				onTouchEnd={handleTouchEvent}
				onTouchLeave={handleTouchEvent}
				onMouseDown={handleMouseEvent}
				onMouseUp={handleMouseEvent}
				bg={(selectedTheme === "light") ? "#f9f9f9" : "#171717"}
				color={(selectedTheme === "light") ? "black" : "rgb(255 255 255 / 92%)"}
				w="full"
				shadow="xs"
				rounded="md"
				d="flex"
				flexDirection="column"
				userSelect="none"
				alignItems="center"
				p="3"
			>
				<JiggyRail/>
				<Box
					mt="2"
					w="full"
					textAlign="left"
				>
					<Info />
				</Box>
				<Text
					mt="2"
					textAlign="right"
					w="full"
					fontSize="xs"
					d="flex"
					justifyContent="flex-start"
					alignItems="center"
					flexDirection="row"
					
				>
					<Image
						boxSize=".9rem" 
						src={GoldeneyeLogo} />
					<Box
						opacity="0.6"
						ml="2"
					>
						Jigsaw Captcha
					</Box> 
					
				</Text>
			</Box>
			</>
		)
	}
	
	if (disableProvider) {
		return (
			<Container maxW={maxW || "300px"} m="0" p="0">
				<JigsawTrack />
			</Container>
		)
	}

  return (
		<ChakraProvider
		>
			<Container maxW={maxW || "300px"} m="0" p="0">
				<JigsawTrack />
			</Container>
		</ChakraProvider>
  )
}

export default App;
