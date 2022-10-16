import { Box, Flex } from "@chakra-ui/react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import Map from "./Components/Map";
import Sidebar from "./Components/Sidebar";


const libraries = ["places"];

function App() {
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [waypoints, setWaypoints] = useState([]);

  if (!isLoaded) {
    return "Завантаження";
  }

  return (
    <Flex h="100vh" w="100vw"  flexDirection={{base: "column", lg: "row"}}>
      <Box
        p={4}
        bgColor="white"
        shadow="base"
        zIndex="1"
        minWidth={"40vw"}
      >
        <Sidebar waypoints={waypoints} setWaypoints={setWaypoints} />
      </Box>
      {/* Google Map Box */}
      <Box h="100vh" w="100%">
        <Map
          waypoints={waypoints}
          setWaypoints={setWaypoints}
        />
      </Box>
    </Flex>
  );
}

export default App;
